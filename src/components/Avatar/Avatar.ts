import { Component } from '../../core/Component.js';

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

if (typeof templator !== 'undefined') {
  templator.registry.register('Avatar', Avatar);
}
