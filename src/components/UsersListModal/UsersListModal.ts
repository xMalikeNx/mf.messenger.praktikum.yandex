import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { DialogsListStore, TDialogsState } from '../../stores/dialogs.store';
import { UiStore } from '../../stores/ui.store';
import { validate } from '../../utils/validate';
import {
  UsersListModalState,
  UsersListModalStore,
} from './usersListModal.store';

export type TUsersListModalProps = {
  entityStore: UsersListModalState;
  dialogs: TDialogsState;
};

export class UsersListModal extends Component<any, TUsersListModalProps> {
  entityStore: UsersListModalStore;
  dialogsStore: DialogsListStore;

  constructor(props: TUsersListModalProps, parent?: Component) {
    super(props, parent);
    this.entityStore = UsersListModalStore.getInstance() as UsersListModalStore;
    this.entityStore.subscribe(this);
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  onCloseModal = (e: MouseEvent): void => {
    const target = e.target as HTMLDivElement;

    if (target.classList.contains('modal')) {
      (UiStore.getInstance() as UiStore).closeInviteUsersListModal();
    }
  };

  onSearchInputChange = (e: KeyboardEvent): void => {
    const value = (e.target as HTMLInputElement).value;
    if (!validate(value)) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Поле поиска содержит невалидные символы',
        'danger'
      );
      return;
    }

    this.entityStore.changeSearch(value);
  };

  onInviteUser = (id: number): void => {
    if (this.props.dialogs.selectedDialogId === null) {
      return;
    }

    this.entityStore.inviteUser(id, this.props.dialogs.selectedDialogId);
    (UiStore.getInstance() as UiStore).closeInviteUsersListModal();
  };

  render(): [string, StateType?] {
    return [
      `
      <div class="modal invite-users-modal" onClick={{onCloseChatUsersModal}}>
        <div class="modal-body">
          <h2 class="modal-body__title">
            Пригласить пользователя
          </h2>
          <SearchInput
            value="{{props.entityStore.search}}"
            onChange={{onSearchInputChange}}
          />
          <ul class="users-list chat-users-list">
            {% for user in props.entityStore.users %}
              <UserListItem
                id={{user.id}}
                avatar={{user.avatar}}
                login={{user.login}}
                onItemClick={{onInviteUser}}
              />  
            {% endfor %}
          </ul>
        </div>
      </div>
      `,
      {
        onCloseChatUsersModal: this.onCloseModal,
        onSearchInputChange: this.onSearchInputChange,
        onInviteUser: this.onInviteUser,
      },
    ];
  }
}
