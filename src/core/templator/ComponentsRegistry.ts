import { Component } from '../Component';

export class ComponentsRegistry {
  private components: { [name: string]: typeof Component } = {};

  register(name: string, Module: typeof Component): void {
    if (!this.components[name]) {
      this.components[name] = Module;
    }
  }

  get(name: string): typeof Component{
    if (!this.components[name]) {
      throw new Error(`Component ${name} not exists`);
    }

    return this.components[name];
  }
}
