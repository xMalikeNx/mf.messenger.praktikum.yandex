import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

import './searchInput.scss';

export type searchInputProps = {
  onChange?: (e: KeyboardEvent) => void;
  value?: string;
};

export class SearchInput extends Component {
  onItemChange = (e: KeyboardEvent): void => {
    if (typeof (this.props as searchInputProps).onChange === 'function') {
      (this.props as searchInputProps).onChange?.(e);
    }
  };

  render(): [string, StateType] {
    const value = (this.props as searchInputProps).value || '';

    return [
      `
      <div class="search-input">
        <input
          class="search-input__field"
          type="text"
          placeholder="Поиск: Enter"
          onChange={{onItemChange}}
          value={{value}}
        />
      </div>
      `,
      { onItemChange: this.onItemChange, value },
    ];
  }
}
