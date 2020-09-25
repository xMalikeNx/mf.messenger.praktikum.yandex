import { htmlTags } from './utils/htmlTags.js';
import { regexMap } from './utils/regexMap.js';
import { getPropertyByPath } from '../../utils/getPropertyByPath.js';
var TagTreeGenerator = /** @class */ (function () {
    function TagTreeGenerator(template, context, module, templator) {
        this.template = template;
        this.context = context;
        this.module = module;
        this.templator = templator;
    }
    TagTreeGenerator.prototype.generate = function () {
        var prepared = this._prepareTemplate();
        var tagTree = this._generateTree(prepared);
        if (tagTree.length > 1) {
            throw new Error("Element should have only 1 root node");
        }
        var root = tagTree[0];
        this._generateDom(root);
        if (!root.element) {
            throw new Error("Can't compile template");
        }
        return root.element;
    };
    TagTreeGenerator.prototype._generateDom = function (root) {
        var _this = this;
        var element = this._createElement(root);
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
            root.childrens.forEach(function (child) { return _this._generateDom(child); });
        }
    };
    TagTreeGenerator.prototype._setContent = function (branch) {
        if (branch.content && branch.parent && branch.parent.element) {
            branch.parent.element.append(branch.content);
        }
    };
    TagTreeGenerator.prototype._setAttributes = function (root, element) {
        var _this = this;
        if (!element || !root.attributes.length) {
            return;
        }
        var attributes = root.attributes;
        attributes.forEach(function (_a) {
            var attribute = _a.attribute, value = _a.value;
            var ctxValue = _this._extractFromCtx(value);
            if (TagTreeGenerator.ACTION_EVENTS[attribute] &&
                (typeof ctxValue !== 'function' || !htmlTags.includes(root.tag))) {
                return;
            }
            if (TagTreeGenerator.ACTION_EVENTS[attribute] &&
                typeof ctxValue === 'function') {
                element.addEventListener(TagTreeGenerator.ACTION_EVENTS[attribute], function (e) {
                    ctxValue(e);
                });
                return;
            }
            if (typeof ctxValue === 'function' || typeof ctxValue === 'object') {
                return;
            }
            if (!ctxValue) {
                element.setAttribute(attribute, value);
            }
            else {
                element.setAttribute(attribute, ctxValue);
            }
        });
    };
    TagTreeGenerator.prototype._createElement = function (root) {
        var tag = root.tag;
        if (!tag) {
            return;
        }
        if (htmlTags.includes(tag)) {
            return document.createElement(tag);
        }
        var Module = this.templator.registry.get(tag);
        var props = this._extractProps(root);
        return this.templator.compile(Module, props);
    };
    TagTreeGenerator.prototype._extractProps = function (root) {
        var _this = this;
        if (!root.attributes.length) {
            return {};
        }
        return root.attributes.reduce(function (result, _a) {
            var attribute = _a.attribute, value = _a.value;
            var ctxValue = _this._extractFromCtx(value);
            if (ctxValue === 'null') {
                result[attribute] = null;
            }
            else if (ctxValue === 'undefined') {
                result[attribute] = undefined;
            }
            else if (ctxValue === 'true') {
                result[attribute] = true;
            }
            else if (ctxValue === 'false') {
                result[attribute] = false;
            }
            else {
                result[attribute] = ctxValue;
            }
            return result;
        }, {});
    };
    TagTreeGenerator.prototype._extractFromCtx = function (fieldName) {
        if (!fieldName.match(/{{.*?}}/g)) {
            return fieldName;
        }
        fieldName = fieldName.replace(/{{(.*?)}}/g, '$1');
        if ((!this.context || !getPropertyByPath(this.context, fieldName)) &&
            (!this.module.props || !getPropertyByPath(this.module.props, fieldName))) {
            return null;
        }
        if (this.module.props &&
            typeof getPropertyByPath(this.module.props, fieldName) === 'function' &&
            this.context &&
            typeof getPropertyByPath(this.context, fieldName) === 'function') {
            return getPropertyByPath(this.context, fieldName);
        }
        if (this.context && getPropertyByPath(this.context, fieldName)) {
            return getPropertyByPath(this.context, fieldName);
        }
        else {
            return getPropertyByPath(this.module.props, fieldName);
        }
    };
    TagTreeGenerator.prototype._prepareTemplate = function () {
        return this.template
            .replace(regexMap.tag, '\n$1\n')
            .split('\n')
            .filter(function (line) { return !!line.trim(); });
    };
    TagTreeGenerator.prototype._generateTree = function (lines) {
        var tree = [];
        var parentBranch = null;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (this._checkClose(line)) {
                if (parentBranch !== null &&
                    typeof parentBranch === 'object' &&
                    parentBranch.parent) {
                    parentBranch = parentBranch.parent;
                }
                else {
                    parentBranch = null;
                }
                continue;
            }
            var newBranch = this._generateBranch();
            if (parentBranch !== null) {
                newBranch.parent = parentBranch;
                parentBranch.childrens.push(newBranch);
            }
            else {
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
    };
    TagTreeGenerator.prototype._fillBranchTag = function (line, branch) {
        var match;
        while ((match = regexMap.openTag.exec(line))) {
            if (match && match.groups) {
                var tag = match.groups.tag;
                branch.tag = tag;
            }
        }
    };
    TagTreeGenerator.prototype._fillBranchAttributes = function (line, branch) {
        var match;
        while ((match = regexMap.attributes.exec(line))) {
            if (match && match.groups) {
                var _a = match.groups, attribute = _a.attribute, value = _a.value;
                if (typeof attribute === 'undefined' || typeof value === 'undefined') {
                    continue;
                }
                branch.attributes.push({
                    attribute: attribute.replace(/"/g, ''),
                    value: value.replace(/"/g, ''),
                });
            }
        }
    };
    TagTreeGenerator.prototype._fillBranchContent = function (line, branch) {
        var openTag = regexMap.openTag, closingTag = regexMap.closingTag, singleLineTag = regexMap.singleLineTag;
        if (!!line.match(openTag) ||
            !!line.match(closingTag) ||
            !!line.match(singleLineTag)) {
            return;
        }
        branch.content = line;
    };
    TagTreeGenerator.prototype._generateBranch = function () {
        return {
            tag: '',
            content: '',
            attributes: [],
            childrens: [],
            parent: null,
            element: null,
            module: null,
        };
    };
    TagTreeGenerator.prototype._checkSingleLine = function (line) {
        return !!line.match(regexMap.singleLineTag);
    };
    TagTreeGenerator.prototype._checkPlainText = function (line) {
        return (!line.match(regexMap.openTag) &&
            !line.match(regexMap.singleLineTag) &&
            !line.match(regexMap.closingTag));
    };
    TagTreeGenerator.prototype._checkClose = function (line) {
        return !!line.match(regexMap.closingTag);
    };
    TagTreeGenerator.ACTION_EVENTS = {
        onClick: 'click',
        onInput: 'input',
        onSubmit: 'submit',
        onChange: 'change',
    };
    return TagTreeGenerator;
}());
export { TagTreeGenerator };
