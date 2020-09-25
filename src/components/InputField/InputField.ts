import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types.js';

export class InputField extends Component {
  onChange = (e: KeyboardEvent) => {
    console.log(this.props);
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

if (typeof templator !== 'undefined') {
  templator.registry.register('InputField', InputField);
}
