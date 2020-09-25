import { regexMap } from './utils/regexMap.js';
import { StateType } from '../types';

export class TemplateAnalyzer {
  private _template: string;
  private _ctx: StateType;
  private _mockCtx: StateType;

  constructor(template: string, ctx: StateType = {}) {
    this._template = template;
    this._ctx = ctx;
    this._mockCtx = ctx;
  }

  extract(): string {
    const tpl = this._template
      .replace(/(\{%)/g, '\n$1')
      .replace(/(%\})/g, '$1\n')
      .replace(/[ ]{2,}/g, '')
      .split('\n')
      .filter((line) => !!line.trim());

    let code: string = `
        return function(${Object.keys(this._ctx)}){
            const result = [];
    `;

    code += tpl.reduce((res, line) => {
      if (this._checkLoop(line)) {
        return res + this._extractLoop(line);
      }
      if (this._checkCondition(line)) {
        return res + this._extractCondition(line);
      }

      return res + this._analyzeLine(line) + '\n';
    }, '');

    code += `return result.join('');\n`;
    code += `}\n`;

    const func = new Function(code)();
    return func(...Object.values(this._mockCtx));
  }

  _analyzeLine(line: string): string {
    const result = line.replace(/'/g, "\\'");

    let replaced = result;
    let row;

    while ((row = regexMap.attributes.exec(result))) {
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

    let match = result.match(regexMap.attributes) || [];
    match = match.filter((item) => !item.match(regexMap.tag));
    if (match && match.length) {
      replaced = replaced.replace(
        regexMap.value,
        "'+ `${typeof $1 === 'object' || typeof $1 === 'function' || typeof $1 === 'undefined' || $1 === null ? '{{$1}}' : $1}` +'"
      );
    } else {
      replaced = replaced.replace(regexMap.value, `'+ $1 +'`);
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

  private _checkLoop(line: string): boolean {
    return (
      !!line.match(regexMap.openLoopRegex) ||
      !!line.match(regexMap.closeLoopRegex)
    );
  }

  private _checkCondition(line: string): boolean {
    return (
      !!line.match(regexMap.ifConditionRegex) ||
      !!line.match(regexMap.elifConditionRegex) ||
      !!line.match(regexMap.elseConditionRegex) ||
      !!line.match(regexMap.closeConditionRegex)
    );
  }

  private _extractCondition(line: string): string {
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
  }

  private _extractLoop(line: string): string {
    if (line.match(regexMap.openLoopRegex)) {
      return line.replace(
        regexMap.openLoopRegex,
        (match, ...args) => `
            for (let ${args[0]} of ${args[1]}) {\n
        `
      );
    }
    return line.replace(regexMap.closeLoopRegex, '}\n');
  }
}
