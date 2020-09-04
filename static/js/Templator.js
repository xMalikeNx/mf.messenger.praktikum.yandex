class TemplateAnalyzer {
  constructor(template, ctx) {
    this.template = template;
    this.ctx = ctx;
    this.mockCtx = ctx;
  }

  regexMap = {
    openLoopRegex: /{% ?for (?<variable>.*?) in (?<array>.*?) ?%}/gi,
    tag: /(<.*?>)/gi,
    closeLoopRegex: /{% ?endfor ?%}/gi,
    ifConditionRegex: /{% if(?<expression>.*?) %}/gi,
    elifConditionRegex: /{% elif(?<expression>.*?) %}/gi,
    elseConditionRegex: /{% else %}/gi,
    closeConditionRegex: /{% endif %}/gi,
    attributes: /<(?:[^ ]*)|(?<attribute>[\w\-]+)=(?<value>(?:{{|").*?(?:"|}}))+?/gi,
  };

  extract() {
    this.mockCtx = Object.keys(this.ctx).reduce((res, key) => {
      res[key] =
        typeof this.ctx[key] === 'function' ? `{{${key}}}` : this.ctx[key];
      return res;
    }, {});

    let tpl = this.template;
    tpl = tpl.replace(/(\{%)/g, '\n$1');
    tpl = tpl.replace(/(%\})/g, '$1\n');
    tpl = tpl.replace(/[ ]{2,}/g, '');
    tpl = tpl.split('\n').filter((line) => !!line.trim());

    let code = `
            return function(${Object.keys(this.ctx)}){
              const result = [];
        `;

    for (let line of tpl) {
      if (this._checkLoop(line)) {
        code += this._extractLoop(line);
      } else if (this._checkConditon(line)) {
        code += this._extractCondition(line);
      } else {
        code += this._analyzeLine(line) + '\n';
      }
    }
    code += `return result.join('')`;
    code += '}';

    const func = new Function(code)();
    return func(...Object.values(this.mockCtx));
  }

  _analyzeLine(line) {
    line = line.replace(/'/g, "\\'");

    let replaced = line;
    let row;

    while ((row = this.regexMap.attributes.exec(line))) {
      if (row && row.groups) {
        let { attribute, value } = row.groups;
        if (!attribute || !value) {
          continue;
        }
        replaced = replaced.replace(
          new RegExp(row[0], 'g'),
          ` ${attribute}="${value}" `
        );
      }
    }

    let match = line.match(this.regexMap.attributes) || [];
    match = match.filter((item) => !item.match(this.regexMap.tag));
    if (match && match.length) {
      replaced = replaced.replace(
        /{{(.*?)}}/g,
        "'+ `${typeof $1 === 'object' ? '{{$1}}' : $1}` +'"
      );
    } else {
      replaced = replaced.replace(/{{(.*?)}}/g, `'+ $1 +'`);
    }

    return `
      result.push((function(){
        try {
          return '${replaced}'; 
        } catch(e) {
          return '${line}';
        }
      }()))
    `;
  }

  _beautifyCode(code) {
    return code
      .replace(/[ ]{2,}/g, '')
      .split('\n')
      .filter((line) => !!line.trim())
      .join('\n');
  }

  _extractLoop(line) {
    if (line.match(this.regexMap.openLoopRegex)) {
      return line.replace(
        this.regexMap.openLoopRegex,
        (match, ...args) => `
        for (let ${args[0]} of ${args[1]}) {\n
        `
      );
    }
    if (line.match(this.regexMap.closeLoopRegex)) {
      return line.replace(this.regexMap.closeLoopRegex, '}\n');
    }
  }

  _checkLoop(line) {
    return (
      line.match(this.regexMap.openLoopRegex) ||
      line.match(this.regexMap.closeLoopRegex)
    );
  }

  _extractCondition(line) {
    if (line.match(this.regexMap.ifConditionRegex)) {
      return line.replace(this.regexMap.ifConditionRegex, 'if ($1) {\n');
    }
    if (line.match(this.regexMap.elifConditionRegex)) {
      return line.replace(
        this.regexMap.elifConditionRegex,
        '} else if ($1) {\n'
      );
    }
    if (line.match(this.regexMap.elseConditionRegex)) {
      return line.replace(this.regexMap.elseConditionRegex, '} else {\n');
    }
    if (line.match(this.regexMap.closeConditionRegex)) {
      return '}\n';
    }
  }

  _checkConditon(line) {
    return (
      line.match(this.regexMap.ifConditionRegex) ||
      line.match(this.regexMap.elifConditionRegex) ||
      line.match(this.regexMap.elseConditionRegex) ||
      line.match(this.regexMap.closeConditionRegex)
    );
  }
}

class TagTreeGenerator {
  constructor(template, context, module, templatorInstance) {
    this.template = template;
    this.context = context;
    this.module = module;
    this.templator = templatorInstance;
  }
  regexMap = {
    tag: /(<.*?>)/g,
    openTag: /(<(?<tag>[^>\/ ]+).*?>)/g,
    closingTag: /(<\/.*?>)/g,
    singleLineTag: /(<(?<tag>[^ \/]+).*? ?\/>)/g,
    attributes: /<(?:[^ ]*)|(?<attribute>[\w\-]+)=(?<value>(?:{{|"{1,2}).*?(?:"{1,2}|}}))+?/g,
  };
  htmlTags = [
    'article',
    'main',
    'pre',
    'div',
    'header',
    'footer',
    'ul',
    'li',
    'ol',
    'span',
    'img',
    'a',
    'p',
    'strong',
    'i',
    'nav',
    'button',
    'input',
    'select',
    'textarea',
    'br',
    'hr',
    'aside',
    'time',
    'form',
    'label',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
  ];
  actionEvents = {
    onClick: 'click',
    onInput: 'input',
    onSubmit: 'submit',
    onChange: 'input',
  };

  generate() {
    const prepared = this._prepareTemplate();
    const tagTree = this._generateTree(prepared);
    if (tagTree.length > 1) {
      console.error(`Element should have only 1 root node`);
    }
    const root = tagTree[0];
    this._generateDom(root);
    if (!root.element) {
      throw new Error(`Can't compile template`);
    }
    return root.element;
  }

  _generateDom(tagTree) {
    let element = this._createElement(tagTree);

    this._setAttributes(tagTree, element);
    this._setContent(tagTree);

    if (element) {
      tagTree.element = element;
      if (!this.module.ref) {
        this.module.ref = element;
        this.module.tagTree = tagTree;

        if (!this.htmlTags.includes(tagTree.tag)) {
          this.module.tagTree.instance = this.module;
        }
      }
      if (tagTree.parent && tagTree.parent.element) {
        tagTree.parent.element.appendChild(element);
      }
    }

    if (tagTree.childrens.length) {
      tagTree.childrens.forEach((child) => this._generateDom(child));
    }
  }

  _setAttributes(tagTree, element) {
    if (!element || !tagTree.attributes.length) {
      return;
    }

    const { attributes } = tagTree;
    attributes.forEach(({ attribute, value }) => {
      const ctxValue = this._extractFromCtx(value);

      if (
        this.actionEvents[attribute] &&
        (typeof ctxValue !== 'function' || !this.htmlTags.includes(tagTree.tag))
      ) {
        return;
      }
      if (this.actionEvents[attribute] && typeof ctxValue === 'function') {
        element.addEventListener(this.actionEvents[attribute], (e) =>
          ctxValue(e)
        );
        return;
      }

      if (!ctxValue) {
        element.setAttribute(attribute, value);
      } else {
        element.setAttribute(attribute, ctxValue);
      }
    });
  }

  _setContent(tagTree) {
    if (tagTree.content && tagTree.parent && tagTree.parent.element) {
      tagTree.parent.element.append(tagTree.content);
    }
  }

  _createElement(tagTree) {
    const { tag } = tagTree;

    if (!tag) {
      return;
    }

    if (this.htmlTags.includes(tag)) {
      return document.createElement(tag);
    }

    const Module = this.templator.registry[tag];
    if (!Module) {
      throw new Error(`Module ${tag} not registered`);
    }

    const props = this._extractProps(tagTree);
    const elem = this.templator.compile(Module, props, tagTree);

    return elem;
  }

  _extractProps(tagTree) {
    if (!tagTree.attributes.length) {
      return {};
    }

    return tagTree.attributes.reduce((result, { attribute, value }) => {
      let ctxValue = this._extractFromCtx(value);
      if (ctxValue === null || ctxValue === undefined) {
        result[attribute] =
          ctxValue === 'null'
            ? null
            : ctxValue === 'undefined'
            ? undefined
            : ctxValue === null
            ? null
            : ctxValue;
      } else {
        result[attribute] =
          ctxValue === 'true' ? true : value === 'false' ? false : ctxValue;
      }
      return result;
    }, {});
  }

  _extractFromCtx(fieldName) {
    if (!fieldName.match(/{{.*?}}/g)) {
      return fieldName;
    }

    fieldName = fieldName.replace(/{{(.*?)}}/g, '$1');
    if (
      (!this.context || !this.context[fieldName]) &&
      (!this.module.props || !this.module.props[fieldName])
    ) {
      return null;
    }

    if (
      this.module.props &&
      typeof this.module.props[fieldName] === 'function' &&
      this.context &&
      typeof this.context[fieldName] === 'function'
    ) {
      return this.context[fieldName];
    }

    if (this.context && this.context[fieldName]) {
      return this.context[fieldName];
    } else {
      return this.module.props[fieldName];
    }
  }

  _generateTree(lines) {
    const tree = [];

    let parentBranch = null;
    for (let line of lines) {
      if (this._checkClose(line)) {
        if (parentBranch && parentBranch.parent) {
          parentBranch = parentBranch.parent;
        } else {
          parentBranch = null;
        }
        continue;
      }

      let newBranch = this._generateBranch();
      if (parentBranch) {
        newBranch.parent = parentBranch;
        parentBranch.childrens.push(newBranch);
      } else {
        tree.push(newBranch);
      }

      this._fillBranchTag(line, newBranch);
      this._fillBranchAttributes(line, newBranch);
      this._fillBranchContent(line, newBranch);

      if (this._checkSingleLine(line) || this._checkPlainText(line)) {
        continue;
      }

      parentBranch = newBranch;
    }
    return tree;
  }

  _checkPlainText(line) {
    return (
      !line.match(this.regexMap.openTag) &&
      !line.match(this.regexMap.singleLineTag) &&
      !line.match(!this.regexMap.closingTag)
    );
  }

  _checkSingleLine(line) {
    return line.match(this.regexMap.singleLineTag);
  }

  _checkClose(line) {
    return line.match(this.regexMap.closingTag);
  }

  _fillBranchTag(line, branch) {
    let match;
    while ((match = this.regexMap.openTag.exec(line))) {
      if (match && match.groups) {
        const { tag } = match.groups;
        branch.tag = tag;
      }
    }
  }

  _fillBranchAttributes(line, branch) {
    let match;
    while ((match = this.regexMap.attributes.exec(line))) {
      if (match && match.groups) {
        const { attribute, value } = match.groups;
        if (attribute === undefined || value === undefined) {
          continue;
        }
        branch.attributes.push({
          attribute: attribute.replace(/"/g, ''),
          value: value.replace(/"/g, ''),
        });
      }
    }
  }

  _fillBranchContent(line, branch) {
    const { openTag, closingTag, singleLineTag } = this.regexMap;
    if (
      line.match(openTag) ||
      line.match(closingTag) ||
      line.match(singleLineTag)
    ) {
      return;
    }

    branch.content = line;
  }

  _generateBranch() {
    return {
      tag: '',
      content: '',
      attributes: [],
      childrens: [],
      parent: null,
    };
  }

  _prepareTemplate() {
    return this.template
      .replace(this.regexMap.tag, '\n$1\n')
      .split('\n')
      .filter((line) => !!line.trim());
  }
}

export class MNTemplator {
  registry = {};

  register(module) {
    if (!module.name) {
      throw new Error(`Module for register should be named`);
    }
    if (this.registry[module.name]) {
      console.warn(`Module already registered`);
    }
    this.registry[module.name] = module;
  }

  compile(module, ctx = {}, tagTree) {
    const moduleName = typeof module === 'function' ? module.name : module;
    const Module = this.registry[moduleName];
    if (!Module) {
      throw new Error(`Module ${moduleName} is not registered`);
    }
    const instance = new Module(ctx);
    if (!instance.hasOwnProperty('render')) {
      throw new Error(`Module should have method 'render'`);
    }

    instance.tick = function (props) {
      this.ctx = this.ctx;
      this.props = props;
      const compiled = window.tpls.compileTemplate(this.render(), this);
      this.ref.replaceWith(compiled);
      this.ref = compiled;
    }.bind(instance);

    instance.findChild = function (name) {
      const child = this.tagTree.childrens.find((child) => child.tag === name);
      return child.module || child;
    }.bind(instance);

    instance.props = { ...instance.props, ...ctx };

    if (tagTree) {
      tagTree.module = instance;
    }

    const compiled = this.compileTemplate(instance.render(), instance);
    return compiled;
  }

  compileTemplate(template, module) {
    if (typeof template !== 'string') {
      throw new Error(`Render method should return string type`);
    }

    const analyzer = new TemplateAnalyzer(template, {
      ...module.ctx,
      ...module.props,
    });
    const analyzedTemplate = analyzer.extract();
    const tagGenerator = new TagTreeGenerator(
      analyzedTemplate,
      module.ctx,
      module,
      this
    );
    return tagGenerator.generate();
  }
}

if (typeof window !== 'undefined') {
  window.tpls = new MNTemplator();
}
