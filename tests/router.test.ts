import { Component } from '../src/core/Component';
import { Router } from '../src/core/Router/Router';

const router = Router.getInstance();

describe('Router location', () => {
  test('Go', () => {
    router.go('/chats');
    expect(window.location.pathname).toEqual('/chats');
  });

  test('Go 2 times', () => {
    router.go('/chats');
    router.go('/profile');
    expect(window.location.pathname).toEqual('/profile');
  });

  // этот тест работать не хочет
  // у меня в коде back не используется, но работает, проверял
  test('Back', () => {
    router.go('/chats');
    router.go('/profile');
    router.back();
    //window.history.back(); - так тоже падает
    expect(window.location.pathname).toEqual('/chats');
  });

  test('Forward', () => {
    router.go('/chats');
    router.go('/profile');
    router.back();
    router.forward();
    expect(window.location.pathname).toEqual('/profile');
  });
});

describe('Router subscribers', () => {
  test('Coincide subscriber', () => {
    class TestComponent extends Component {
      constructor() {
        super({});
        const router = Router.getInstance();
        // @ts-ignore
        router.subscribe(this);
      }

      render(): [string] {
        return [`<div></div>`];
      }
    }

    const testComponent = new TestComponent();
    // @ts-ignore
    expect(router._subscribers[0]).toEqual(testComponent);
  });
});
