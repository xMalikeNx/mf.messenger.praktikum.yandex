import { regexMap } from './utils/regexMap.js';
var TemplateAnalyzer = /** @class */ (function () {
    function TemplateAnalyzer(template, ctx) {
        if (ctx === void 0) { ctx = {}; }
        this._template = template;
        this._ctx = ctx;
        this._mockCtx = ctx;
    }
    TemplateAnalyzer.prototype.extract = function () {
        var _this = this;
        var tpl = this._template
            .replace(/(\{%)/g, '\n$1')
            .replace(/(%\})/g, '$1\n')
            .replace(/[ ]{2,}/g, '')
            .split('\n')
            .filter(function (line) { return !!line.trim(); });
        var code = "\n        return function(" + Object.keys(this._ctx) + "){\n            const result = [];\n    ";
        code += tpl.reduce(function (res, line) {
            if (_this._checkLoop(line)) {
                return res + _this._extractLoop(line);
            }
            if (_this._checkCondition(line)) {
                return res + _this._extractCondition(line);
            }
            return res + _this._analyzeLine(line) + '\n';
        }, '');
        code += "return result.join('');\n";
        code += "}\n";
        var func = new Function(code)();
        return func.apply(void 0, Object.values(this._mockCtx));
    };
    TemplateAnalyzer.prototype._analyzeLine = function (line) {
        var result = line.replace(/'/g, "\\'");
        var replaced = result;
        var row;
        while ((row = regexMap.attributes.exec(result))) {
            if (row && row.groups) {
                var _a = row.groups, attribute = _a.attribute, value = _a.value;
                if (!attribute || !value) {
                    continue;
                }
                replaced = replaced.replace(new RegExp(row[0], 'g'), " " + attribute + "=\"" + value + "\" ");
            }
        }
        var match = result.match(regexMap.attributes) || [];
        match = match.filter(function (item) { return !item.match(regexMap.tag); });
        if (match && match.length) {
            replaced = replaced.replace(regexMap.value, "'+ `${typeof $1 === 'object' || typeof $1 === 'function' || typeof $1 === 'undefined' || $1 === null ? '{{$1}}' : $1}` +'");
        }
        else {
            replaced = replaced.replace(regexMap.value, "'+ $1 +'");
        }
        return "\n      result.push((function(){\n        try {\n          return '" + replaced + "'; \n        } catch(e) {\n          return '" + line + "';\n        }\n      }()))\n    ";
    };
    TemplateAnalyzer.prototype._checkLoop = function (line) {
        return (!!line.match(regexMap.openLoopRegex) ||
            !!line.match(regexMap.closeLoopRegex));
    };
    TemplateAnalyzer.prototype._checkCondition = function (line) {
        return (!!line.match(regexMap.ifConditionRegex) ||
            !!line.match(regexMap.elifConditionRegex) ||
            !!line.match(regexMap.elseConditionRegex) ||
            !!line.match(regexMap.closeConditionRegex));
    };
    TemplateAnalyzer.prototype._extractCondition = function (line) {
        if (line.match(regexMap.ifConditionRegex)) {
            return line.replace(regexMap.ifConditionRegex, 'if ($1) {\n');
        }
        if (line.match(regexMap.elifConditionRegex)) {
            return line.replace(regexMap.elifConditionRegex, '} else if ($1) {\n');
        }
        if (line.match(regexMap.elseConditionRegex)) {
            return line.replace(regexMap.elseConditionRegex, '} else {\n');
        }
        return '}\n';
    };
    TemplateAnalyzer.prototype._extractLoop = function (line) {
        if (line.match(regexMap.openLoopRegex)) {
            return line.replace(regexMap.openLoopRegex, function (match) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return "\n            for (let " + args[0] + " of " + args[1] + ") {\n\n        ";
            });
        }
        return line.replace(regexMap.closeLoopRegex, '}\n');
    };
    return TemplateAnalyzer;
}());
export { TemplateAnalyzer };
