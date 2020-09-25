var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ComponentsRegistry } from './ComponentsRegistry.js';
import { TagTreeGenerator } from './TagTreeGenerator.js';
import { TemplateAnalyzer } from './TemplateAnalyzer.js';
var MNTemplator = /** @class */ (function () {
    function MNTemplator() {
        this.registry = new ComponentsRegistry();
    }
    MNTemplator.prototype.compile = function (Module, props) {
        var instance = new Module(props);
        var _a = instance.render(), template = _a[0], localVariables = _a[1];
        var compiled = this.compileTemplate(template, instance, localVariables);
        return compiled;
    };
    MNTemplator.prototype.compileTemplate = function (template, module, localVariables) {
        var analyzer = new TemplateAnalyzer(template, __assign({ props: module.props, state: module.state }, localVariables));
        var analyzedTemplate = analyzer.extract();
        var tagGenerator = new TagTreeGenerator(analyzedTemplate, __assign({ props: module.props, state: module.state }, localVariables), module, this);
        var item = tagGenerator.generate();
        return item;
    };
    return MNTemplator;
}());
export { MNTemplator };
if (typeof window !== 'undefined') {
    window.templator = new MNTemplator();
}
