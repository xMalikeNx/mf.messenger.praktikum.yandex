import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { UiStore } from '../../stores/ui.store';

import './notification.scss';

export class Notification extends Component {
  private uiStore: UiStore;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);
    this.uiStore = UiStore.getInstance() as UiStore;
    this.uiStore.subscribe(this);
  }

  componentWillUnmount(): void {
    this.uiStore.unsubscribe(this);
  }

  render(): [string] {
    console.log(this.props);
    return [
      `
      <div 
          {% if props.ui.notification.type === "success" %}
              class="notification notification--success"
          {% elif props.ui.notification.type === "danger" %}
              class="notification notification--danger"
          {% elif props.ui.notification.type === "info" %}
              class="notification notification--info"
          {% else %}
              class="notification"
          {% endif %}
      >
          {{props.ui.notification.message}}
      </div>
      `,
    ];
  }
}
