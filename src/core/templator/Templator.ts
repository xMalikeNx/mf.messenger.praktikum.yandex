import { Component } from '../Component.js';
import { StateType } from '../types';
import { ComponentsRegistry } from './ComponentsRegistry.js';
import { Branch, TagTreeGenerator } from './TagTreeGenerator.js';
import { TemplateAnalyzer } from './TemplateAnalyzer.js';

export class MNTemplator {
  public registry: ComponentsRegistry = new ComponentsRegistry();

  compile(Module: typeof Component, props: StateType): HTMLElement {
    const instance = new Module(props);
    const [template, localVariables] = instance.render();

    const compiled = this.compileTemplate(template, instance, localVariables);
    return compiled;
  }

  compileTemplate(
    template: string,
    module: Component,
    localVariables?: StateType
  ): HTMLElement {
    let analyzer = new TemplateAnalyzer(template, {
      props: module.props,
      state: module.state,
      ...localVariables,
    });

    let analyzedTemplate = analyzer.extract();

    const tagGenerator = new TagTreeGenerator(
      analyzedTemplate,
      {
        props: module.props,
        state: module.state,
        ...localVariables,
      },
      module,
      this
    );
    const item = tagGenerator.generate();
    return item;
  }
}

if (typeof window !== 'undefined') {
  (window as any).templator = new MNTemplator();
}
