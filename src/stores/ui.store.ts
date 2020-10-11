import { Store } from '../core/Store';

type TNotificationType = 'default' | 'success' | 'danger' | 'info';

export type TUiStore = {
  notification: {
    opened: boolean;
    message: string;
    type?: TNotificationType;
  };
  modals: {
    chatUsersList: {
      opened: boolean;
    };
    inviteUsersList: {
      opened: boolean;
    };
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
      modals: {
        chatUsersList: {
          opened: false,
        },
        inviteUsersList: {
          opened: false,
        },
      },
    };
  }

  public showChatUsersListModal = (): void => {
    this.updateState({
      modals: {
        ...this.state.modals,
        chatUsersList: {
          opened: true,
        },
      },
    });
  };

  public closeChatUsersListModal = (): void => {
    this.updateState({
      modals: {
        ...this.state.modals,
        chatUsersList: {
          opened: false,
        },
      },
    });
  };

  public showInviteUsersListModal = (): void => {
    this.updateState({
      modals: {
        ...this.state.modals,
        inviteUsersList: {
          opened: true,
        },
      },
    });
  };

  public closeInviteUsersListModal = (): void => {
    this.updateState({
      modals: {
        ...this.state.modals,
        inviteUsersList: {
          opened: false,
        },
      },
    });
  };

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
