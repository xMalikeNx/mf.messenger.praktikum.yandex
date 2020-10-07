import { Store } from '../core/Store';

type TNotificationType = 'default' | 'success' | 'danger' | 'info';

type TUiStore = {
  notification: {
    opened: boolean;
    message: string;
    type?: TNotificationType;
  };
};

export class UiStore extends Store<TUiStore> {
  notificationTimer: number | null = null;

  constructor() {
    super();
    this._displayName = 'ui';
    this.state = {
      notification: {
        opened: false,
        message: 'test',
        type: 'default',
      },
    };
  }

  public showNotification(
    message: string,
    type: TNotificationType = 'default'
  ): void {
    if (this.notificationTimer !== null) {
      clearTimeout(this.notificationTimer);
    }

    this.updateState({
      notification: {
        opened: true,
        message,
        type,
      },
    });

    this.notificationTimer = window.setTimeout(() => {
      this.updateState({
        notification: {
          opened: false,
          message: '',
          type: 'default',
        },
      });
    }, 3000);
  }
}
