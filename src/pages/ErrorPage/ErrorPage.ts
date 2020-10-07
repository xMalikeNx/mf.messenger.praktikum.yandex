import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import './errorPage.scss';

export class ErrorPage extends Component<{name: string}> {
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
