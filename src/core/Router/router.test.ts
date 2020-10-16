import { Component } from '../Component';
import { Router } from './Router';

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

  test('Back', (done) => {
    const handlePopState = () => {
      expect(window.location.pathname).toEqual('/chats');
      window.removeEventListener('popstate', handlePopState);
      done();
    };
    window.addEventListener('popstate', handlePopState);

    router.go('/chats');
    router.go('/profile');
    router.back();
  });

  test('Forward', (done) => {
    let isBack = false;
    const handlePopState = () => {
      if (!isBack) {
        isBack = true;
        return;
      }
      expect(window.location.pathname).toEqual('/profile');
      window.removeEventListener('popstate', handlePopState);
      done();
    };
    window.addEventListener('popstate', handlePopState);
    router.go('/chats');
    router.go('/profile');
    router.back();
    setTimeout(() => router.forward(), 0);
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
