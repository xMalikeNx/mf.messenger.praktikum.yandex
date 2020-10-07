import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

import './inputField.scss';

export class InputField extends Component {
  onChange = (e: KeyboardEvent): void => {
    if (typeof this.props.onFieldChange === 'function') {
      this.props.onFieldChange(e);
    }
  };

  render(): [string, StateType?] {
    const value = this.props.value || '';
    const placeholder = this.props.placeholder || '';

    return [
      `
      <div class="input-block">
          <label class="input-block__label" for={{props.id}}>{{props.title}}</label>
          <input
            class="input-block__field"
            name={{props.name}}
            id="{{props.id}}"
            type="{{props.type}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            onChange={{onChange}}
            />
      </div>
      `,
      { value, onChange: this.onChange, placeholder },
    ];
  }
}
