import { Button, InputField } from '../src/components/index';
import { MNTemplator } from '../src/core/templator/Templator';

let templator: MNTemplator;
beforeAll(() => {
  templator = MNTemplator.getInstance();
});

describe('Button', () => {
  test('Render with initial props', () => {
    const button = new Button({ text: 'hello' });
    const buttonEl = templator.compileTemplate(button.render()[0], button);
    expect(buttonEl.outerHTML).toBe('<button class="btn ">hello</button>');
  });

  test('Render after set props', () => {
    const button = new Button({ text: 'hello' });
    button.setProps({ text: 'new text' });
    const buttonEl = templator.compileTemplate(button.render()[0], button);
    expect(buttonEl.outerHTML).toBe('<button class="btn ">new text</button>');
  });
});

describe('InputField', () => {
  test('Render prop to dom attributes', () => {
    const inputField = new InputField({
      name: 'login',
    });
    const wrapperEl = templator.compileTemplate(
      inputField.render()[0],
      inputField
    );
    const inputEl = wrapperEl.querySelector('input');
    const nameAttribute = inputEl?.getAttribute('name');
    expect(nameAttribute).toBe('login');
  });

  test('Render function prop to dom attributes', () => {
    const inputField = new InputField({
      onFieldChange: () => {},
    });
    const wrapperEl = templator.compileTemplate(
      inputField.render()[0],
      inputField
    );
    const inputEl = wrapperEl.querySelector('input');
    const nameAttribute = inputEl?.getAttribute('onFieldChange');
    expect(nameAttribute).toBe(null);
  });

  test('Render prop to dom attributes after setProps', () => {
    const inputField = new InputField({
      name: 'login',
    });
    inputField.setProps({
      name: 'new value',
    });
    const wrapperEl = templator.compileTemplate(
      inputField.render()[0],
      inputField
    );
    const inputEl = wrapperEl.querySelector('input');
    const nameAttribute = inputEl?.getAttribute('name');
    expect(nameAttribute).toBe('new value');
  });
});
