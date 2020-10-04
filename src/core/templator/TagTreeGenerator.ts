import { Component } from '../Component';
import { htmlTags } from './utils/htmlTags';
import { regexMap } from './utils/regexMap';
import { StateType } from '../types';
import { getPropertyByPath } from '../../utils/getPropertyByPath';
import { MNTemplator } from './Templator';

export type BranchAttributeType = { [name: string]: unknown };

export interface Branch {
  tag: string;
  content: string;
  attributes: BranchAttributeType[];
  childrens: Branch[];
  parent: Branch | null;
  element: HTMLElement | null;
  module: Component | null;
}

export type TagTree = Branch[];

type ActionEventsType = {
  [name: string]: string;
};

export class TagTreeGenerator {
  static readonly ACTION_EVENTS: ActionEventsType = {
    onClick: 'click',
    onInput: 'input',
    onSubmit: 'submit',
    onChange: 'change',
  };

  private template: string;
  private context: StateType;
  private module: Component;
  private templator: MNTemplator;

  constructor(
    template: string,
    context: StateType,
    module: Component,
    templator: MNTemplator
  ) {
    this.template = template;
    this.context = context;
    this.module = module;
    this.templator = templator;
  }

  generate(): HTMLElement {
    const prepared = this._prepareTemplate();
    const tagTree: TagTree = this._generateTree(prepared);
    if (tagTree.length > 1) {
      throw new Error(`Element should have only 1 root node`);
    }
    const root: Branch = tagTree[0];
    this._generateDom(root);

    if (!root.element) {
      throw new Error(`Can't compile template`);
    }

    return root.element;
  }

  private _generateDom(root: Branch) {
    const element = this._createElement(root);
    this._setContent(root);

    if (element) {
      this._setAttributes(root, element);
      root.element = element;
      if (!this.module.element) {
        this.module.element = element;
      }
      if (root.parent && root.parent.element) {
        root.parent.element.append(element);
      }
    }

    if (root.childrens.length) {
      root.childrens.forEach((child) => this._generateDom(child));
    }
  }

  private _setContent(branch: Branch) {
    if (branch.content && branch.parent && branch.parent.element) {
      branch.parent.element.append(branch.content);
    }
  }

  private _setAttributes(root: Branch, element: HTMLElement): void {
    if (!element || !root.attributes.length) {
      return;
    }

    const { attributes } = root;
    attributes.forEach(({ attribute, value }) => {
      const ctxValue = this._extractFromCtx(value as string);
      if (
        TagTreeGenerator.ACTION_EVENTS[attribute as string] &&
        (typeof ctxValue !== 'function' || !htmlTags.includes(root.tag))
      ) {
        return;
      }

      if (
        TagTreeGenerator.ACTION_EVENTS[attribute as string] &&
        typeof ctxValue === 'function'
      ) {
        element.addEventListener(
          TagTreeGenerator.ACTION_EVENTS[attribute as string],
          (e) => {
            ctxValue(e);
          }
        );
        return;
      }

      if (typeof ctxValue === 'function' || typeof ctxValue === 'object') {
        return;
      }

      if (!ctxValue) {
        element.setAttribute(attribute as string, value as string);
      } else {
        element.setAttribute(attribute as string, ctxValue as string);
      }
    });
  }

  private _createElement(root: Branch) {
    const { tag } = root;

    if (!tag) {
      return;
    }

    if (htmlTags.includes(tag)) {
      return document.createElement(tag);
    }

    const Module = this.templator.registry.get(tag);
    const props = this._extractProps(root);
    return this.templator.compile(Module, props);
  }

  private _extractProps(root: Branch) {
    if (!root.attributes.length) {
      return {};
    }

    return root.attributes.reduce((result, { attribute, value }) => {
      const ctxValue = this._extractFromCtx(value as string);

      if (ctxValue === 'null') {
        result[attribute as string] = null;
      } else if (ctxValue === 'undefined') {
        result[attribute as string] = undefined;
      } else if (ctxValue === 'true') {
        result[attribute as string] = true;
      } else if (ctxValue === 'false') {
        result[attribute as string] = false;
      } else {
        result[attribute as string] = ctxValue;
      }

      return result;
    }, {});
  }

  private _extractFromCtx(fieldName: string) {
    if (!fieldName.match(/{{.*?}}/g)) {
      return fieldName;
    }

    fieldName = fieldName.replace(/{{(.*?)}}/g, '$1');
    if (
      (!this.context || !getPropertyByPath(this.context, fieldName)) &&
      (!this.module.props || !getPropertyByPath(this.module.props, fieldName))
    ) {
      return null;
    }

    if (
      this.module.props &&
      typeof getPropertyByPath(this.module.props, fieldName) === 'function' &&
      this.context &&
      typeof getPropertyByPath(this.context, fieldName) === 'function'
    ) {
      return getPropertyByPath(this.context, fieldName);
    }

    if (this.context && getPropertyByPath(this.context, fieldName)) {
      return getPropertyByPath(this.context, fieldName);
    } else {
      return getPropertyByPath(this.module.props, fieldName);
    }
  }

  private _prepareTemplate(): string[] {
    return this.template
      .replace(regexMap.tag, '\n$1\n')
      .split('\n')
      .filter((line) => !!line.trim());
  }

  private _generateTree(lines: string[]): TagTree {
    const tree: TagTree = [];

    let parentBranch: Branch | null = null;
    for (const line of lines) {
      if (this._checkClose(line)) {
        if (
          parentBranch !== null &&
          typeof parentBranch === 'object' &&
          (parentBranch as Branch).parent
        ) {
          parentBranch = (parentBranch as Branch).parent;
        } else {
          parentBranch = null;
        }
        continue;
      }

      const newBranch: Branch = this._generateBranch();
      if (parentBranch !== null) {
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

  private _fillBranchTag(line: string, branch: Branch): void {
    let match;
    while ((match = regexMap.openTag.exec(line))) {
      if (match && match.groups) {
        const { tag } = match.groups;
        branch.tag = tag;
      }
    }
  }

  private _fillBranchAttributes(line: string, branch: Branch): void {
    let match;
    while ((match = regexMap.attributes.exec(line))) {
      if (match && match.groups) {
        const { attribute, value } = match.groups;
        if (typeof attribute === 'undefined' || typeof value === 'undefined') {
          continue;
        }
        branch.attributes.push({
          attribute: attribute.replace(/"/g, ''),
          value: value.replace(/"/g, ''),
        });
      }
    }
  }

  private _fillBranchContent(line: string, branch: Branch) {
    const { openTag, closingTag, singleLineTag } = regexMap;
    if (
      !!line.match(openTag) ||
      !!line.match(closingTag) ||
      !!line.match(singleLineTag)
    ) {
      return;
    }

    branch.content = line;
  }

  private _generateBranch(): Branch {
    return {
      tag: '',
      content: '',
      attributes: [],
      childrens: [],
      parent: null,
      element: null,
      module: null,
    };
  }

  private _checkSingleLine(line: string): boolean {
    return !!line.match(regexMap.singleLineTag);
  }

  private _checkPlainText(line: string): boolean {
    return (
      !line.match(regexMap.openTag) &&
      !line.match(regexMap.singleLineTag) &&
      !line.match(regexMap.closingTag)
    );
  }

  private _checkClose(line: string): boolean {
    return !!line.match(regexMap.closingTag);
  }
}
