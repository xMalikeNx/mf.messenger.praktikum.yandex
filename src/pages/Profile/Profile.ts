import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types.js';
import { ProfileStore } from '../../stores/profile.store.js';

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
