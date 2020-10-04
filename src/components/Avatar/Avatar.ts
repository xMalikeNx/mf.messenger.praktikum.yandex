import { Component } from '../../core/Component';

import './avatar.scss';

export class Avatar extends Component {
  render(): [string] {
    return [
      `
      <div class="avatar" style="background: {{props.background}}">
          {{props.title}}
      </div>
      `,
    ];
  }
}
