import { DeepPartial } from '../types';
import { Component } from './Component';
import { EventBus } from './EventBus';

export class Store<T = Record<string, unknown>> {
  static readonly EVENTS = {
    UPDATE: 'update',
  };

  protected static instance: Store | null = null;

  protected _eventBus: EventBus;

  protected _state: T = {} as T;

  protected _displayName: string | null = null;

  private _subscribers: Component[] = [];

  protected constructor() {
    this._eventBus = new EventBus();
    this._init();
  }

  set state(value: T) {
    this._state = value;
    this._eventBus.emit(Store.EVENTS.UPDATE);
  }

  get state(): T {
    return this._state;
  }

  public subscribe(instance: Component): void {
    if (this._displayName === null) {
      console.error('Display name not provided');
      return;
    }
    this._subscribers.push(instance);
    this.updateSubscriberProps(instance);
  }

  private _init() {
    this._eventBus.on(Store.EVENTS.UPDATE, () =>
      this._subscribers.forEach((subscriber) =>
        this.updateSubscriberProps(subscriber)
      )
    );
  }

  private updateSubscriberProps(subscriber: Component) {
    subscriber.setProps({
      [this._displayName as string]: { ...this._state },
    });
  }

  public unsubscribe(instance: Component): void {
    this._subscribers = this._subscribers.filter(
      (subscriber) => subscriber !== instance
    );
  }

  public updateState(newState: DeepPartial<T>): void {
    this.state = Object.assign(this.state, newState);
  }

  public static getInstance(): Store {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}
