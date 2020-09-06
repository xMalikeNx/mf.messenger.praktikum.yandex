import { regexMap } from './regexMap.js';

export class TemplateAnalyzer {
  constructor(template, ctx) {
    this.template = template;
    this.ctx = ctx;
    this.mockCtx = ctx;
  }

  extract() {
    this.mockCtx = Object.keys(this.ctx).reduce((res, key) => {
      res[key] =
        typeof this.ctx[key] === 'function' ? `{{${key}}}` : this.ctx[key];
      return res;
    }, {});

    const tpl = this.template
      .replace(/(\{%)/g, '\n$1')
      .replace(/(%\})/g, '$1\n')
      .replace(/[ ]{2,}/g, '')
      .split('\n')
      .filter((line) => !!line.trim());

    let code = `
            return function(${Object.keys(this.ctx)}){
              const result = [];
        `;

    code += tpl.reduce((res, line) => {
      if (this._checkLoop(line)) {
        return res + this._extractLoop(line);
      }
      if (this._checkConditon(line)) {
        return res + this._extractCondition(line);
      }

      return res + this._analyzeLine(line) + '\n';
    }, '');

    code += `return result.join('')`;
    code += '}';

    const func = new Function(code)();
    return func(...Object.values(this.mockCtx));
  }

  _analyzeLine(line) {
    const result = line.replace(/'/g, "\\'");

    let replaced = result;
    let row;

    while ((row = regexMap.attributes.exec(result))) {
      if (row && row.groups) {
        let { attribute, value } = row.groups;
        if (!attribute || !value) {
          continue;
        }

        // Тут не понятно как обойтись без мутирования
        // Нам нужно подготовить текущую строку к коду, который ниже
        // По этому пока не правлю
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
        "'+ `${typeof $1 === 'object' ? '{{$1}}' : $1}` +'"
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

  _extractLoop(line) {
    if (line.match(regexMap.openLoopRegex)) {
      return line.replace(
        regexMap.openLoopRegex,
        // тут формируется строка цикла для выполнения в формируемой функции
        // где $args[0] это название переменной, которая будет создана в цикле,
        // а args[1] это название итерируемого объекта
        // к примеру цыкл из шаблона вида:
        // {% for item in items %}
        // будет преобразован в
        // for (let item of items) {
        // а далее эту переменную можно использовать в теле цыкла
        (match, ...args) => `
        for (let ${args[0]} of ${args[1]}) {\n
        `
      );
    }
    if (line.match(regexMap.closeLoopRegex)) {
      return line.replace(regexMap.closeLoopRegex, '}\n');
    }
  }

  _checkLoop(line) {
    return (
      line.match(regexMap.openLoopRegex) || line.match(regexMap.closeLoopRegex)
    );
  }

  _extractCondition(line) {
    if (line.match(regexMap.ifConditionRegex)) {
      return line.replace(regexMap.ifConditionRegex, 'if ($1) {\n');
    }
    if (line.match(regexMap.elifConditionRegex)) {
      return line.replace(regexMap.elifConditionRegex, '} else if ($1) {\n');
    }
    if (line.match(regexMap.elseConditionRegex)) {
      return line.replace(regexMap.elseConditionRegex, '} else {\n');
    }
    if (line.match(regexMap.closeConditionRegex)) {
      return '}\n';
    }
  }

  _checkConditon(line) {
    return (
      line.match(regexMap.ifConditionRegex) ||
      line.match(regexMap.elifConditionRegex) ||
      line.match(regexMap.elseConditionRegex) ||
      line.match(regexMap.closeConditionRegex)
    );
  }
}
