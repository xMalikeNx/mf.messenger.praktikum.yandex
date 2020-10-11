import { Component } from '../Component';
import { EventBus } from '../EventBus';

export type TRouter = {
  pathname: string;
};

export class Router {
  private static readonly ROUTER_EVENTS = {
    CR: 'changeRoute',
  };
  private static instance: Router;

  private _history: History;
  private _eventBus: EventBus;
  private _subscribers: Component[] = [];

  private constructor() {
    this._history = window.history;
    this._eventBus = new EventBus();
    this._init();
    this._start();
  }

  private _start() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.addEventListener('popstate', (_event: PopStateEvent) => {
      this._onChangeRoute();
    });
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onChangeRoute();
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private _onChangeRoute(): void {
    this._eventBus.emit(Router.ROUTER_EVENTS.CR, this.pathname);
  }

  public subscribe(instance: Component): void {
    this._subscribers.push(instance);
    this.updateSubscriberProps(instance);
  }

  private _init() {
    this._eventBus.on(Router.ROUTER_EVENTS.CR, () =>
      this._subscribers.forEach((subscriber) =>
        this.updateSubscriberProps(subscriber)
      )
    );
  }

  private updateSubscriberProps(subscriber: Component) {
    subscriber.setProps({ router: { pathname: this.pathname } });
  }

  public unsubscribe(instance: Component): void {
    this._subscribers = this._subscribers.filter(
      (subscriber) => subscriber !== instance
    );
  }

  get pathname(): string {
    return window.location.pathname;
  }

  get history(): History {
    return this._history;
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }
}
