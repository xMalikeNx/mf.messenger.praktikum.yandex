import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types';

export class ErrorPage extends Component {
  render(): [string, StateType?] {
    return [
      `
        <div class="app gradient-page">
            <div class="error-panel">
                <div class="error-panel__code">{{props.code}}</div>
                <div class="error-panel__message">{{props.title}}</div>
            </div>
        </div>
        `,
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('ErrorPage', ErrorPage);
}
