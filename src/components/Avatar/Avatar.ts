import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

import './avatar.scss';

export type TAvatarProps = {
  title?: string;
  url?: string;
  background?: string;
  className?: string;
};

export class Avatar extends Component<any, TAvatarProps> {
  render(): [string, StateType] {
    const avatarClassName = `avatar ${this.props.className ?? ''}`;
    const background = this.props.url
      ? `url('${this.props.url}'); background-size: cover; background-repeat: no-repeat`
      : this.props.background;

    return [
      `
      <div class={{className}}
        {% if props.url %}
          style="background: {{background}}"
        {% else %}
          style="background: {{props.background}}"
        {% endif %}
      >
        {% if !props.url %}
          {{props.title}}
        {% endif %}
      </div>
      `,
      { className: avatarClassName, background },
    ];
  }
}
