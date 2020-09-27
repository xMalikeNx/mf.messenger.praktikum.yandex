import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

export class Button extends Component {
  constructor(props: StateType) {
    super(props);

    this.props = {
      className: this.props.className || '',
      text: this.props.text || 'Button',
    };
  }

  handleClick() {
    this.setState({
      name: !this.state.name,
    });
  }

  timeout() {
    this.setState({
      loading: false,
    });
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

if (typeof templator !== 'undefined') {
  templator.registry.register('Button', Button);
}
