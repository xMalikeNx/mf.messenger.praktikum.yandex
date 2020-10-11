import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import dotsUrl from './dots.svg';
import './chatDropdown.scss';
import { UiStore } from '../../stores/ui.store';
import { DialogsListStore } from '../../stores/dialogs.store';

type TChatDropdownState = {
  opened: boolean;
};

export class ChatDropdown extends Component<TChatDropdownState> {
  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.state = {
      opened: false,
    };
  }

  onToggle = (): void => {
    this.setState({ opened: !this.state.opened });
  };

  showChatUsersModal = (): void => {
    (DialogsListStore.getInstance() as DialogsListStore).fetchSelectedChatUsers();
    (UiStore.getInstance() as UiStore).showChatUsersListModal();
  };

  showUsersListModal = (): void => {
    (UiStore.getInstance() as UiStore).showInviteUsersListModal();
  };

  render(): [string, StateType] {
    return [
      `
      <div class="dropdown">
        <button class="dropdown__toggle" onClick={{onToggle}}>
          <div class="settings-wrap">
            <div class="dots-icon">
              <img
                  class="dots-icon__img"
                  src={{dotsUrl}}
                  alt="dots"
              />
            </div>
          </div>
        </button>
        {% if state.opened %}
          <ul class="dropdown__menu">
            <li class="dropdown__menu-item">
              <button onClick={{showChatUsersModal}}>Участники чата</button>
            </li>
            <li class="dropdown__menu-item">
              <button onClick={{showUsersListModal}}>Добавить участника</button>
            </li>
          </ul>
        {% endif %}
      </div>
    `,
      {
        onToggle: this.onToggle,
        dotsUrl,
        showChatUsersModal: this.showChatUsersModal,
        showUsersListModal: this.showUsersListModal,
      },
    ];
  }
}
