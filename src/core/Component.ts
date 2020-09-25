import { EventBus } from './EventBus.js';
import { Branch } from './templator/TagTreeGenerator.js';
import { StateType } from './types.js';

export class Component {
  static readonly EVENTS = {
    INIT: 'init',
    CDM: 'componentDidMount',
    CDU: 'componentDidUpdate',
    RENDER: 'render',
  };

  protected _props: StateType = {};
  protected _state: StateType = {};
  private _eventBus: EventBus;
  private _element: HTMLElement | null = null;

  constructor(props: StateType = {}) {
    this._eventBus = new EventBus();
    this._initEvents();
    this.props = props;
    setTimeout(() => this.eventBus.emit(Component.EVENTS.INIT), 0);
  }

  private _initEvents() {
    this.eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Component.EVENTS.CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.RENDER, this._render.bind(this));
  }

  setState(newState: StateType) {
    this.state = Object.assign(this.state, newState);
  }

  setProps(newProps: StateType) {
    this.props = Object.assign(this.props, newProps);
  }

  get state() {
    return this._state;
  }

  set state(value: StateType) {
    const prevState = { ...this.state };
    const prevProps = { ...this.props };

    this._state = Object.assign(this.state, value);
    this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
  }

  set props(value: StateType) {
    const prevState = { ...this.state };
    const prevProps = { ...this.props };

    this._props = Object.assign(this.props, value);
    this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
  }

  get props() {
    return this._props;
  }

  get eventBus() {
    return this._eventBus;
  }

  get element() {
    return this._element;
  }

  set element(value: HTMLElement | null) {
    this._element = value;
  }

  private _init() {
    this.eventBus.emit(Component.EVENTS.CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(prevProps: StateType, prevState: StateType) {
    const shouldRender = this.componentDidUpdate(prevProps, prevState);

    if (shouldRender) {
      this.eventBus.emit(Component.EVENTS.RENDER);
    }
  }

  protected _render() {
    if (this.element) {
      const [template, localVariables] = this.render();
      const el = templator.compileTemplate(
        template,
        this,
        localVariables,
      );
      this.element.replaceWith(el);
      this.element = el;
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps: StateType, prevState: StateType): boolean {
    return true;
  }

  render(): [string, StateType?] {
    return [''];
  }
}
