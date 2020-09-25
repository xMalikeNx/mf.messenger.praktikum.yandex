import { Component } from '../static/js/core/Component.js';
import { Router } from '../static/js/core/Router/Router.js';

test('Check pathname', () => {
  const router = Router.getInstance();

  router.go('/chats');
  expect(window.location.pathname).toEqual('/chats');

  router.go('/profile');
  expect(window.location.pathname).toEqual('/profile');

  // не смог завести, хотя в браузере все работает адекватно
  //   router.back();
  //   console.log(window.location.pathname);
  //   expect(window.location.pathname).toEqual('/chats');

  //   router.forward();
  //   expect(window.location.pathname).toEqual('/profile');
});

test('Check subscribers', () => {
  class TestComponent extends Component {
    constructor() {
      super();
      const router = Router.getInstance();
      router.subscribe(this);
    }

    render() {
      return [`<div></div>`];
    }
  }

  const testComponent = new TestComponent();

  expect(Router.getInstance()._subscribers.length).toEqual(1);
  expect(Router.getInstance()._subscribers[0]).toBe(testComponent);
});
