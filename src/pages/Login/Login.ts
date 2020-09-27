import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

export class Login extends Component {
  render(): [string, StateType?] {
    return [
      `
      <div class="gradient-page">
        <LoginForm />
      </div>
      `,
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('Login', Login);
}
