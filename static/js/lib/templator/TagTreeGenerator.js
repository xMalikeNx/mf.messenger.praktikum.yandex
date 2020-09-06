import { regexMap } from './regexMap.js';
import { htmlTags } from './htmlTags.js';

export class TagTreeGenerator {
  constructor(template, context, module, templatorInstance) {
    this.template = template;
    this.context = context;
    this.module = module;
    this.templator = templatorInstance;
  }

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

        if (!htmlTags.includes(tagTree.tag)) {
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
        (typeof ctxValue !== 'function' || !htmlTags.includes(tagTree.tag))
      ) {
        return;
      }
      if (this.actionEvents[attribute] && typeof ctxValue === 'function') {
        element.addEventListener(this.actionEvents[attribute], (e) =>
          ctxValue(e)
        );
        return;
      }

      if (typeof ctxValue === 'function' || typeof ctxValue === 'object') {
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

    if (htmlTags.includes(tag)) {
      return document.createElement(tag);
    }

    const Module = this.templator.registry[tag];
    if (!Module) {
      throw new Error(`Module ${tag} not registered`);
    }

    const props = this._extractProps(tagTree);
    return this.templator.compile(Module, props, tagTree);
  }

  _extractProps(tagTree) {
    if (!tagTree.attributes.length) {
      return {};
    }

    return tagTree.attributes.reduce((result, { attribute, value }) => {
      let ctxValue = this._extractFromCtx(value);
      if (ctxValue === 'null') {
        result[attribute] = null;
      } else if (ctxValue === 'undefined') {
        result[attribute] = undefined;
      } else if (ctxValue === 'true') {
        result[attribute] = true;
      } else if (ctxValue === 'false') {
        result[attribute] = false;
      } else {
        result[attribute] = ctxValue;
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
      !line.match(regexMap.openTag) &&
      !line.match(regexMap.singleLineTag) &&
      !line.match(!regexMap.closingTag)
    );
  }

  _checkSingleLine(line) {
    return line.match(regexMap.singleLineTag);
  }

  _checkClose(line) {
    return line.match(regexMap.closingTag);
  }

  _fillBranchTag(line, branch) {
    let match;
    while ((match = regexMap.openTag.exec(line))) {
      if (match && match.groups) {
        const { tag } = match.groups;
        branch.tag = tag;
      }
    }
  }

  _fillBranchAttributes(line, branch) {
    let match;
    while ((match = regexMap.attributes.exec(line))) {
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
    const { openTag, closingTag, singleLineTag } = regexMap;
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
      .replace(regexMap.tag, '\n$1\n')
      .split('\n')
      .filter((line) => !!line.trim());
  }
}
