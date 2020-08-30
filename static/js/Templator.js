export class Templator {
  constructor() {
    this.registry = {};
    this.regexList = {
      tag: /<(?<tag>\/?\w+).*?>/,
      oneLineTag: /<(?<tag>\/?\w+).*\/>/g,
      tagEnd: /<(?<tag>\/\w+).*?>/,
      emptyTagEnd: /\/>/g,
      loop: /{% for (?<variable>.*) in (?<array>.*) %}(?<content>[\s\S.]*){% endfor %}/,
      attributes: /(?<attribute>[^ ]*?)=(?<value>(".*?")|{{.*?}})/g,
      openLoop: /{% for .* in .* %}/,
      closeLoop: /{% endfor %}/,
      condition: /{% if (?<target>.*) (?<operator>.*) (?<value>.*) %}(?<content>[\s\S.]*){% endif %}/,
      openCondition: /{% if (.*?) (.*?) (.*?) %}/,
      closeCondition: /{% endif %}/,
    };
    this.events = {
      onClick: 'click',
      onSubmit: 'submit',
      onChange: 'change',
      onKeyDown: 'keydown',
      onKeyUp: 'keyup',
      onFocus: 'focus',
      onBlur: 'blur',
    };
    this.htmlTags = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'span',
      'strong',
      'i',
      'div',
      'nav',
      'ul',
      'li',
      'ol',
      'article',
      'header',
      'footer',
      'section',
      'form',
      'button',
      'input',
      'textarea',
      'img',
    ];
  }

  register(module) {
    if (module.name) {
      this.registry[module.name] = module;
    } else {
      throw new Error('Module should have render method and name');
    }
  }

  create(module, props = {}) {
    const Module = this.registry[module.name || module];
    if (!Module) {
      throw new Error(`Module ${module.name} not registered`);
    }

    const { context, render } = new Module(props);
    if (!render) {
      throw new Error('Module should have render method');
    }

    return this._generate(render(), context);
  }

  _generate(template, context) {
    const splitted = this._splitIn(template);
    const tagsTree = this._createTree(splitted);

    if (tagsTree.length > 1) {
      throw new Error('Template should have only 1 root element');
    }

    const [tree] = tagsTree;
    this._createAndSetElements(tree, context);
    return tree.element;
  }

  _createAndSetElements(tree, ctx) {
    let element;
    const tag = tree.tagName;

    if (!tag && !tree.parent) {
      throw new Error('template structure error');
    } else if (!tag && tree.parent) {
      tree.parent.element.append(tree.content);
      return;
    }

    if (this.htmlTags.includes(tag)) {
      element = document.createElement(tag);
      tree.element = element;

      if (tree.parent) {
        tree.parent.element.appendChild(element);
      }
    } else if (Object.keys(this.registry).some((key) => key === tag)) {
      const props = tree.attributes.reduce((result, { attribute, value }) => {
        const contextValue = this._extractFromContext(value, ctx);
        if (contextValue === null) {
          return result;
        }

        result[attribute] = contextValue;
        return result;
      }, {});

      element = this.create(tag, props);

      if (tree.parent) {
        tree.parent.element.appendChild(element);
      }
    } else {
      if (tree.parent) {
        tree.parent.element.append(tag);
      }
    }
    if (tree.childrens.length) {
      tree.childrens.forEach((child) => this._createAndSetElements(child, ctx));
    }
  }

  _extractFromContext(name, ctx) {
    const replaced = name.replace(/[{}]/g, '');
    if (typeof ctx[replaced] === 'function') {
      return ctx[replaced];
    }
    return ctx[name] || null;
  }

  _splitIn(template) {
    const tagRegex = this.regexList.tag;
    const tagEndRegex = this.regexList.tagEnd;
    const replaced = template
      .replace(new RegExp(tagRegex, 'g'), (match) => `\n${match}\n`)
      .replace(new RegExp(tagEndRegex, 'g'), (match) => `\n${match}\n`);
    let result = replaced.split('\n').filter((part) => !!part.trim());

    // result = this._extractLoops(result);
    // result = this._extractConditions(result);
    return result.filter((part) => !!part.trim()).map((part) => part.trim());
  }

  _extractConditions(parts) {
    let result = parts;
    while (
      result.some(
        (part) =>
          this.regexList.openCondition.test(part) &&
          !this.regexList.closeCondition.test(part)
      )
    ) {
      result = this._joinConditions(parts);
    }
    return result;
  }

  _joinConditions(parts) {
    const openConditionRegex = this.regexList.openCondition;
    const closeConditionRegex = this.regexList.closeCondition;

    let deep = 0;
    let start = 0;
    let end = 0;

    let idx = 0;
    for (let part of parts) {
      if (openConditionRegex.test(part)) {
        deep += 1;
        start = idx;
      } else if (closeConditionRegex.test(part)) {
        deep -= 1;
        end = idx;
        if (deep === 0) {
          break;
        }
      }
      idx += 1;
    }

    const conditionStr = parts
      .slice(start, end + 1)
      .reduce((result, part) => (result += part), '');

    return [
      ...parts.slice(0, start),
      conditionStr,
      ...parts.slice(end + 1, parts.length),
    ];
  }

  _extractLoops(parts) {
    let result = parts;
    while (
      result.some(
        (part) =>
          this.regexList.openLoop.test(part) &&
          !this.regexList.closeLoop.test(part)
      )
    ) {
      result = this._joinLoops(result);
    }
    return result;
  }

  _joinLoops(parts) {
    const openLoopRegex = this.regexList.openLoop;
    const closeLoopRegex = this.regexList.closeLoop;

    let deep = 0;
    let start = 0;
    let end = 0;

    let idx = 0;
    for (let part of parts) {
      if (openLoopRegex.test(part)) {
        deep += 1;
        start = idx;
      } else if (closeLoopRegex.test(part)) {
        deep -= 1;
        end = idx;
        if (deep === 0) {
          break;
        }
      }
      idx += 1;
    }

    const loopStr = parts
      .slice(start, end + 1)
      .reduce((result, part) => (result += part), '');

    return [
      ...parts.slice(0, start),
      loopStr,
      ...parts.slice(end + 1, parts.length),
    ];
  }

  _createTree(tagParts) {
    console.log(tagParts);

    const tagsTree = [];

    let currentTag;
    for (let part of tagParts) {
      if (this._isClosedTag(part)) {
        if (currentTag && currentTag.parent) {
          currentTag = currentTag.parent;
          continue;
        }
        if (!currentTag.parent) {
          tagsTree.push(currentTag);
          currentTag = null;
          continue;
        }
      }

      if (this._isSingleLineTag(part) || this._isPlainText(part)) {
        const newTag = this._createTreeItem();
        this._process(newTag, part);
        if (currentTag) {
          newTag.parent = currentTag;
          currentTag.childrens.push(newTag);
        } else {
          tagsTree.push(newTag);
        }
        continue;
      }

      const newTag = this._createTreeItem();
      this._process(newTag, part);
      if (currentTag) {
        newTag.parent = currentTag;
        currentTag.childrens.push(newTag);
      }
      currentTag = newTag;
    }
    return tagsTree;
  }

  _isPlainText(part) {
    const tagRegex = this.regexList.tag;
    const oneLineTagRegex = this.regexList.oneLineTag;
    return !tagRegex.test(part) && !oneLineTagRegex.test(part);
  }

  _savePlainText(currentTag, part, tagsTree) {
    this._process(currentTag, part);
    return this._goUpBranch(currentTag, tagsTree);
  }

  _saveSingleLineTag(currentTag, part, tagsTree) {
    this._process(currentTag, part);
    return this._goUpBranch(currentTag, tagsTree);
  }

  _process(currentTag, part) {
    this._setTag(currentTag, part);
    this._setAttributes(currentTag, part);
    this._setContent(currentTag, part);
  }

  _clearQuotes(val) {
    if (/".*"/.test(val)) {
      return val.replace(/"/g, '');
    }
    return val;
  }

  _setAttributes(currentTag, part) {
    const regex = this.regexList.attributes;
    for (let match of part.matchAll(regex)) {
      if (match && match.groups) {
        const { attribute, value } = match.groups;
        currentTag.attributes.push({
          attribute,
          value: this._clearQuotes(value),
        });
      }
    }
  }

  _setContent(currentTag, part) {
    currentTag.content = part;
  }

  _isSingleLineTag(part) {
    return this.regexList.oneLineTag.test(part);
  }

  _isClosedTag(part) {
    const tagEndRegex = this.regexList.tagEnd;
    console.log(`${part} is ${tagEndRegex.test(part)}`);
    return tagEndRegex.test(part);
  }

  _setTag(currentTag, part) {
    const regex = this.regexList.tag;
    const match = regex.exec(part);
    if (match) {
      const { tag } = match.groups;
      currentTag.tagName = tag;
    }
  }

  _createTreeItem() {
    return {
      tagName: '',
      content: '',
      childrens: [],
      attributes: [],
      events: {},
      parent: null,
    };
  }
}

if (typeof window !== 'undefined') {
  window.tpls = new Templator();
}
