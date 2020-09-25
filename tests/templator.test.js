import { Component } from '../static/js/core/Component';
import { MNTemplator } from '../static/js/core/templator/Templator';

test('Compile with 2 root elements', () => {
  class TestComponent extends Component {
    render() {
      return [
        `
        <div>wrong</div>
        <div>wrong</div>
        `,
      ];
    }
  }

  const testComponent = new TestComponent();
  expect(() => {
    templator.compileTemplate(testComponent.render()[0], testComponent);
  }).toThrowError();
});

test('Compile with props', () => {
  class TestComponent extends Component {
    render() {
      return [
        `
        <div>
           <span id="name">{{props.name}}</span>
           <span id="age">{{props.age}}</span>
        </div>
        `,
      ];
    }
  }

  const testComponent = new TestComponent({
    name: 'Maliken',
    age: 22,
  });
  const el = templator.compileTemplate(
    testComponent.render()[0],
    testComponent
  );
  expect(el.querySelector('#name').textContent).toEqual('Maliken');
  expect(el.querySelector('#age').textContent).toEqual('22');
});

test('Compile with loops', () => {
  class TestComponent extends Component {
    render() {
      return [
        `
            <div>
                {% for item in [1,2,3,4,5,6,7,8,9,10] %}
                    <span>hello</span>
                {% endfor %}
            </div>
        `,
      ];
    }
  }

  const testComponent = new TestComponent();
  const el = templator.compileTemplate(
    testComponent.render()[0],
    testComponent
  );
  expect(el.querySelectorAll('span').length).toEqual(10);
});

test('Compile with condition', () => {
  class TestComponent extends Component {
    render() {
      return [
        `
            <div>
            {% if props.name === "Maliken" %}
                {{props.name}}
            {% elif props.name === "Admin" %}
                Name is admin
            {% else %}
                name not exist
            {% endif %}
            </div>
          `,
      ];
    }
  }

  const testComponent = new TestComponent({
    name: 'Maliken',
  });
  let el = templator.compileTemplate(testComponent.render()[0], testComponent);
  expect(el.textContent).toEqual('Maliken');

  testComponent.setProps({
    name: 'Admin',
  });
  el = templator.compileTemplate(testComponent.render()[0], testComponent);
  expect(el.textContent).toEqual('Name is admin');

  testComponent.setProps({
    name: '',
  });
  el = templator.compileTemplate(testComponent.render()[0], testComponent);
  expect(el.textContent).toEqual('name not exist');
});
