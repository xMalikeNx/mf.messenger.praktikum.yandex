import { Component } from '../Component';
import { MNTemplator } from './Templator';

const templator = MNTemplator.getInstance();

describe('Templator', () => {
  test('Compile with 2 root elements', () => {
    class TestComponent extends Component {
      render(): [string] {
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
      render(): [string] {
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

    const nameEl = el.querySelector('#name');
    const ageEl = el.querySelector('#age');

    const expected = { name: nameEl?.textContent, age: ageEl?.textContent };

    expect(expected).toEqual({ name: 'Maliken', age: '22' });
  });

  test('Compile with loops', () => {
    class TestComponent extends Component {
      render(): [string] {
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
      render(): [string] {
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
    const el = templator.compileTemplate(
      testComponent.render()[0],
      testComponent
    );
    expect(el.textContent).toEqual('Maliken');
  });
});
