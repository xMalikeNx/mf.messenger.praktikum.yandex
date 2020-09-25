import { MNTemplator } from '../static/js/core/templator/Templator';
import { Button, InputField } from '../static/js/components/index.js';

test('Button component', () => {
  const button = new Button({ text: 'hello' });
  let buttonEl = templator.compileTemplate(button.render()[0], button);

  expect(buttonEl.outerHTML).toBe('<button class="btn ">hello</button>');

  button.setProps({ text: 'hi' });
  buttonEl = templator.compileTemplate(button.render()[0], button);
  expect(buttonEl.outerHTML).toBe('<button class="btn ">hi</button>');
});

test('InputField component', () => {
  const inputField = new InputField({
    name: 'login',
    id: 'login',
    title: 'Логин',
    placeholder: 'Логин',
    onFieldChange: () => void 0,
  });
  let wrapEl = templator.compileTemplate(inputField.render()[0], inputField);

  expect(wrapEl.querySelector('input').name).toBe('login');
  expect(wrapEl.querySelector('input').id).toBe('login');
  expect(wrapEl.querySelector('input').getAttribute('onFieldChange')).toBe(
    null
  );
  expect(wrapEl.querySelector('label').textContent).toBe('Логин');

  inputField.setProps({
    value: 'hello world',
  });
  wrapEl = templator.compileTemplate(inputField.render()[0], inputField);

  expect(wrapEl.querySelector('input').value).toBe('hello world');
});
