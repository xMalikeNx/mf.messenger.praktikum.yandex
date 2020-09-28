import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

export class LoadingIndicator extends Component {
  render(): [string, StateType?] {
    return [
      `
      <div class="loading-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      `,
    ];
  }
}
