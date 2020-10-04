import { Component } from '../../core/Component';
import { StateType } from '../../core/types';

import './loadingIndicator.scss';

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
