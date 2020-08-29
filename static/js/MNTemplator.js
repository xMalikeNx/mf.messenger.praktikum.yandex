export class MNTemplator {
  constructor() {
    this.registry = [];
    this.regexTemplates = {
      tag: /<(?<tag>[^ ]*)[\s\S.]*>/,
      endTag: /<.*?\/?>/,
      fullTag: /<(?<tag>.*?)>(?<content>.*)<\/.*>/,
      attributes: /(?<attribute>[^ ]*?)=(?<value>(".*?")|{{.*?}})/g,
    };
    this.actionAttributes = {
      onClick: 'click',
      onSubmit: 'submit',
      onEnter: 'mouseenter',
      onLeave: 'mouseleave',
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
    ];
  }

  register(module) {
    console.log('register');
    if (typeof module !== 'function' && typeof module !== 'object') {
      throw new Error(`register don't allowed arg of type ${typeof module}`);
    }
    if (module.name === undefined || '') {
      throw new Error(`module should have name`);
    }

    this.registry.push(module);
  }

  create(moduleName, moduleArgs) {
    const Module = this.registry.find((module) => module.name === moduleName);
    if (!Module) {
      throw new Error(`can't find module`);
    }

    try {
      const { render, context } = new Module(moduleArgs);
      return this._replace(render(), context);
    } catch (err) {
      console.log(err);
      throw new Error(`create error`);
    }
  }

  _replace(content, ctx) {
    console.log(content);
    console.log(ctx);
    let contentParts = content
      .replace(/<.*?>/g, (part, ...args) => `\n${part}\n`)
      .replace(/\/>/g, (part, ...args) => `\n${part}\n`)
      .split('\n');
    contentParts = contentParts
      .map((part) => part.trim())
      .filter((part) => !!part);
    const tagsTree = this._getTagsTree(contentParts);
    console.log(tagsTree);
    if (tagsTree.length > 1) {
      throw new Error(`component template should have only one root element`);
    }
    const htmlElements = this._createElements(tagsTree[0], ctx);
    return htmlElements;
  }

  _createElements(item, ctx) {
    let element;
    if (this.htmlTags.includes(item.tag)) {
      element = document.createElement(item.tag);
    } else {
      const module = this.registry.find((module) => module.name === item.tag);
      if (!module) {
        return null;
      }

      const props = item.attributes.reduce((result, { attribute, value }) => {
        const contextValue = this._getContextContent(value, ctx);
        result[attribute] = contextValue;
        return result;
      }, {});

      return this.create(module.name, props);
    }

    if (item.content) {
      element.textContent = this._getContextContent(item.content, ctx);
    }
    if (item.attributes.length) {
      this._setAttributes(element, item.attributes, ctx);
    }

    if (item.childrens) {
      const childrens = item.childrens.map((child) =>
        this._createElements(child, ctx)
      );
      childrens.forEach((child) => element.appendChild(child));
    }
    return element;
  }

  _clearQuotes(val) {
    if (/".*"/.test(val)) {
      return val.replace(/"/g, '');
    }
    return val;
  }

  _getContextContent(content, ctx) {
    const regex = /{{(?<field>.*?)}}/gi;
    if (!regex.test(content)) {
      return this._clearQuotes(content);
    }

    const template = content.replace(regex, (match, ...args) => {
      const [fieldName] = args;
      const value = ctx[fieldName.trim()];
      if (!value) {
        return '';
      }

      return value;
    });
    return template;
  }

  _setAttributes(node, attributes, ctx) {
    attributes.forEach(({ attribute, value }) => {
      value = this._clearQuotes(value);
      if (attribute in this.actionAttributes) {
        const cb = ctx[value.replace(/[{}]/g, '')];
        if (!cb) {
          console.log(`callback not found`);
          return false;
        }
        this._setEventListener(node, this.actionAttributes[attribute], cb);
      } else {
        const val = ctx[value.replace(/[{}]/g, '')];
        const attributeValue = val || value;
        node.setAttribute(attribute, attributeValue);
      }
    });
  }

  _setEventListener(node, event, cb) {
    node.addEventListener(event, (E) => cb(e));
  }

  _createTagBranch() {
    return {
      tag: '',
      parent: '',
      childrens: [],
      content: '',
      attributes: [],
    };
  }

  _getTagsTree(parts) {
    const tagsTree = [];
    let currentTag;
    for (let part of parts) {
      currentTag = this._doStep(currentTag, part, tagsTree);
      this._setTagIfIsSet(currentTag, part); // h1
      this._setContentIfIsSet(currentTag, part); //hello world
      this._setAttributesIfIsSet(currentTag, part); // onClick
    }
    return tagsTree;
  }

  _doStep(currentObj, part, tagsTree) {
    const regex = this.regexTemplates.tag;
    const match = regex.exec(part);
    if (!match || !match.groups) {
      return currentObj;
    }

    const { tag } = match.groups;
    if (tag.includes('/')) {
      if (currentObj.parent) {
        return currentObj.parent;
      } else {
        tagsTree.push(currentObj);
        return this._createTagBranch();
      }
    }

    if (!currentObj) {
      return this._createTagBranch();
    }

    const newObj = this._createTagBranch();
    currentObj.childrens.push(newObj);
    newObj.parent = currentObj;
    return newObj;
  }

  _setAttributesIfIsSet(currentObj, part) {
    const regex = this.regexTemplates.attributes;

    let row = null;
    let partTemplate = part;

    while ((row = regex.exec(partTemplate))) {
      if (row && row.groups) {
        const { attribute, value } = row.groups;
        currentObj.attributes.push({ attribute, value });
      }
    }
  }

  _setTagIfIsSet(currentObj, part) {
    const regex = this.regexTemplates.tag;
    const match = regex.exec(part);
    if (!match || !match.groups) {
      return;
    }
    const { tag } = match.groups;
    if (!tag.includes('/') && tag.length > 0) {
      currentObj.tag = tag;
    }
  }

  _setContentIfIsSet(tag, part) {
    const regex = this.regexTemplates.endTag;
    if (!regex.exec(part)) {
      tag.content += part;
    }
  }
}

if (window !== 'undefined') {
  window.mntpls = new MNTemplator();
}
