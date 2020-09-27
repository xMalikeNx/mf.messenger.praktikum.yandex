import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

export class Profile extends Component {
  render(): [string, StateType?] {
    return [
      `
      <div class="content-view">
        <div class="content-view-wrapper">
          <ProfileForm />
        </div>
      </div>
      `,
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('Profile', Profile);
}
