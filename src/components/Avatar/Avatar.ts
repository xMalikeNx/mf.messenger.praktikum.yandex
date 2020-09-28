import { Component } from '../../core/Component';

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
