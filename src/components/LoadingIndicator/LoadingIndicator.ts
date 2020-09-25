import { Component } from '../../core/Component.js';
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

if (typeof templator !== 'undefined') {
  templator.registry.register('LoadingIndicator', LoadingIndicator);
}
