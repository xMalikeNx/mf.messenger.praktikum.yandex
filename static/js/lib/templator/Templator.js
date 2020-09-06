import { regexMap } from './regexMap.js';
import { htmlTags } from './htmlTags.js';
import { TemplateAnalyzer } from './TemplateAnalyzer.js';
import { TagTreeGenerator } from './TagTreeGenerator.js';

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
      this.props = props;
      const compiled = window.tpls.compileTemplate(this.render(), this);
      this.ref.replaceWith(compiled);
      // replaceWith заменяет ноду на новую, а в переменной ref хранится ссылка на старую ноду, в итоге, если не 
      // выполнить код ниже, то доступ к ноде будет потерян
      this.ref = compiled;
    }.bind(instance);

    instance.findChild = function (name) {
      const child = this.tagTree.childrens.find((child) => child.tag === name);
      return child.module || child;
    }.bind(instance);

    // к сожалению это так и выглядит))
    // это костыль, который нужно будет исправить
    // но сейчас на этот момент нет времени :(
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
