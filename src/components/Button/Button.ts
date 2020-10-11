import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

import './button.scss';

export class Button extends Component {
  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.props = {
      className: this.props.className || '',
      text: this.props.text || 'Button',
    };
  }

  render(): [string, StateType?] {
    return [
      `
      <button class="btn {{props.className}}" onClick={{props.onClick}}>
          {{props.text}}
      </button>
      `,
    ];
  }
}
