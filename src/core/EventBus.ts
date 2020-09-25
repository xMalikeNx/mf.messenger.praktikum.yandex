export type EventBusListenerType = (...props: any) => void;

export type EventBusListenersType = { [name: string]: EventBusListenerType[] };

export class EventBus {
  private listeners: EventBusListenersType = {};

  public on(event: string, listener: EventBusListenerType): void {
    if (typeof this.listeners[event] === 'undefined') {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  public off(event: string, listener: EventBusListenerType): void {
    if (typeof this.listeners[event] === 'undefined') {
      throw new Error(`Event ${event} not exists`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (busListener: EventBusListenerType) => listener !== busListener
    );
  }

  public emit(event: string, ...props: unknown[]): void {
    if (typeof this.listeners[event] === 'undefined') {
      console.error(`Event ${event} not exists`);
      return;
    }

    this.listeners[event].forEach((listener) => listener(props));
  }
}
