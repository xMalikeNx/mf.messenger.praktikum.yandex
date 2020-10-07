import { DeepPartial } from '../types';
import { EventBus } from './EventBus';
import { MNTemplator } from './templator/Templator';

const templator = MNTemplator.getInstance();

type TChildren = Array<Component | null>;

export class Component<
  State = Record<string, unknown>,
  Props = Record<string, unknown>
> {
  static readonly EVENTS = {
    INIT: 'init',
    CDM: 'componentDidMount',
    CDU: 'componentDidUpdate',
    RENDER: 'render',
  };

  protected _props: Props = {} as Props;
  protected _state: State = {} as State;
  private _eventBus: EventBus;
  private _element: HTMLElement | null = null;
  private _parent: Component | null = null;
  private _children: TChildren = [];

  constructor(props: Props = {} as Props, parent: Component | null = null) {
    this._eventBus = new EventBus();
    this._initEvents();
    this._parent = parent;
    if (parent !== null) {
      parent.children.push(this as any);
    }
    this.props = props;
    // Действия в конструкторе наследника не успевают выполниться перед тем как происходит cdm
    // таким образом эта проблема якобы решается
    setTimeout(() => this.eventBus.emit(Component.EVENTS.INIT), 0);
  }

  private _initEvents() {
    this.eventBus.on(Component.EVENTS.INIT, this._init.bind(this));
    this.eventBus.on(Component.EVENTS.CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Component.EVENTS.CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Component.EVENTS.RENDER, this._render.bind(this));
  }

  setState(newState: DeepPartial<State>): void {
    this.state = Object.assign(this.state, newState);
  }

  setProps(newProps: DeepPartial<Props>): void {
    this.props = Object.assign(this.props, newProps);
  }

  public get parent(): Component | null {
    return this._parent;
  }

  public set parent(value: Component | null) {
    this._parent = value;
  }

  public get children(): TChildren {
    return this._children;
  }

  public set children(value: TChildren) {
    this._children = value;
  }

  get state(): State {
    return this._state;
  }

  set state(value: State) {
    const prevState = { ...this.state };
    const prevProps = { ...this.props };

    this._state = Object.assign(this.state, value);
    this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
  }

  set props(value: Props) {
    const prevState = { ...this.state };
    const prevProps = { ...this.props };

    this._props = Object.assign(this.props, value);
    this.eventBus.emit(Component.EVENTS.CDU, prevProps, prevState);
  }

  get props(): Props {
    return this._props;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get eventBus() {
    return this._eventBus;
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  set element(value: HTMLElement | null) {
    this._element = value;
  }

  private _init() {
    // Элемент успевает отрендериться, когда устанавливаются props и state
    this.eventBus.emit(Component.EVENTS.CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  private _componentDidUpdate(prevProps: Props, prevState: State) {
    const shouldRender = this.componentDidUpdate(prevProps, prevState);

    if (shouldRender) {
      this.eventBus.emit(Component.EVENTS.RENDER);
    }
  }

  protected _render(): void {
    if (this.element) {
      const [template, localVariables] = this.render();
      const el = templator.compileTemplate(
        template,
        this as any,
        localVariables
      );
      this.element.replaceWith(el);
      this.element = el;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidMount(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_prevProps: Props, _prevState: State): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentWillUnmount(): void {}

  render(): [string, Record<string, unknown>?] {
    return [''];
  }
}
