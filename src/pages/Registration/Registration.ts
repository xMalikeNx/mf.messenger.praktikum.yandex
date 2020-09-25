import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types.js';

export class Registration extends Component {
  render(): [string, StateType?] {
    return [`
    <div class="gradient-page">
      <RegistrationForm />
    </div>
    `];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('Registration', Registration);
}
