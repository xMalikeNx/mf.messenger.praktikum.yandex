import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

export class Registration extends Component {
  render(): [string, StateType?] {
    return [
      `
      <div class="gradient-page">
        <RegistrationForm />
      </div>
      `,
    ];
  }
}
