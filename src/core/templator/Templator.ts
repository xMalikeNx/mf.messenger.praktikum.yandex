import { Component } from '../Component';
import { StateType } from '../types';
import { ComponentsRegistry } from './ComponentsRegistry';
import { TagTreeGenerator } from './TagTreeGenerator';
import { TemplateAnalyzer } from './TemplateAnalyzer';

export class MNTemplator {
  private static _instance: MNTemplator | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): MNTemplator {
    if (MNTemplator._instance === null) {
      MNTemplator._instance = new MNTemplator();
    }
    return MNTemplator._instance;
  }

  public registry: ComponentsRegistry = new ComponentsRegistry();

  compile(Module: typeof Component, props: StateType): HTMLElement {
    const instance = new Module(props);
    const [template, localVariables] = instance.render();
    return this.compileTemplate(template, instance, localVariables);
  }

  compileTemplate(
    template: string,
    module: Component,
    localVariables?: StateType
  ): HTMLElement {
    const analyzer = new TemplateAnalyzer(template, {
      props: module.props,
      state: module.state,
      ...localVariables,
    });

    const analyzedTemplate = analyzer.extract();

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
    return tagGenerator.generate();
  }
}
