import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { AuthStore, TAuthStore } from '../../stores/auth.store';
import { DialogsListStore, TDialogsState } from '../../stores/dialogs.store';
import { UiStore } from '../../stores/ui.store';

type TChatUsersListModalProps = {
  dialogs: TDialogsState;
  auth: TAuthStore;
};

export class ChatUsersListModal extends Component<
  any,
  TChatUsersListModalProps
> {
  dialogsStore: DialogsListStore;
  authStore: AuthStore;

  constructor(props: TChatUsersListModalProps, parent?: Component) {
    super(props, parent);

    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
    this.authStore = AuthStore.getInstance() as AuthStore;
    this.authStore.subscribe(this);
  }

  componentWillUnmount(): void {
    this.dialogsStore.unsubscribe(this);
    this.authStore.unsubscribe(this);
  }

  deleteUserFromChat = (id: number): void => {
    if (this.props.dialogs.selectedDialogId === null) {
      return;
    }
    this.dialogsStore.deleteUser(id);
    (UiStore.getInstance() as UiStore).closeChatUsersListModal();
  };

  onCloseModal = (e: MouseEvent): void => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains('modal')) {
      (UiStore.getInstance() as UiStore).closeChatUsersListModal();
    }
  };

  onCloseChatUsersModal(): void {
    (UiStore.getInstance() as UiStore).closeChatUsersListModal();
  }

  render(): [string, StateType?] {
    return [
      `
      <div class="modal" onClick={{onCloseModal}}>
        <div class="modal-body">
          <h2 class="modal-body__title">
            Пользователи чата
          </h2>
          <ul class="users-list chat-users-list">
            {% for user in props.dialogs.selectedChatUsers %}
              <UserListItem
                id={{user.id}}
                login={{user.login}}
                avatar={{user.avatar}}
                onRemove={{deleteUserFromChat}}
                {% if user.id !== props.auth.user.id %}
                  withRemove="true"
                {% endif %}
              />
            {% endfor %}
          </ul>
        </div>
      </div>
      `,
      {
        onCloseModal: this.onCloseModal,
        deleteUserFromChat: this.deleteUserFromChat,
      },
    ];
  }
}
