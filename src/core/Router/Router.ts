import { Component } from '../Component';
import { EventBus } from '../EventBus';

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
    window.addEventListener('popstate', (_event: PopStateEvent) => {
      this._onChangeRoute();
    });
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onChangeRoute();
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private _onChangeRoute() {
    this._eventBus.emit(Router.ROUTER_EVENTS.CR, this.pathname);
  }

  public subscribe(instance: Component) {
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

  public unsubscribe(instance: Component) {
    this._subscribers = this._subscribers.filter(
      (subscriber) => subscriber !== instance
    );
  }

  get pathname() {
    return window.location.pathname;
  }

  get history() {
    return this._history;
  }

  public static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }
}
