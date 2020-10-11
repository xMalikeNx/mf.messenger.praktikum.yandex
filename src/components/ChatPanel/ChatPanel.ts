import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { ChatStore } from '../../stores/chat.store';

import './chatPanel.scss';
import attachUrl from './attach.svg';
import sendUrl from './send.svg';
import { DialogsListStore, TDialogsState } from '../../stores/dialogs.store';
import { getFirstLitera } from '../../utils/getFirstLitera';

type TChatPanelProps = {
  dialogs: TDialogsState;
};

export class ChatPanel extends Component<any, TChatPanelProps> {
  private chatStore: ChatStore;
  private dialogsStore: DialogsListStore;

  constructor(props: TChatPanelProps, parent?: Component) {
    super(props, parent);

    this.chatStore = ChatStore.getInstance() as ChatStore;
    this.chatStore.subscribe(this);
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  componentWillUnmount(): void {
    this.chatStore.unsubscribe(this);
    this.dialogsStore.unsubscribe(this);
  }

  render(): [string, StateType?] {
    const { dialogs } = this.props;
    const selectedChat =
      dialogs.items.find((chat) => chat.id === dialogs.selectedDialogId) ||
      dialogs.items[0];

    const firstLitera = getFirstLitera(selectedChat.title);

    return [
      `
      <main class="chat-panel">
          <header class="top-bar">
          <button class="back-button">
              <img
              class="back-button__icon"
              src="{{dotsUrl}}"
              alt="back"
              />
          </button>
          <div class="top-bar-info">
              <div class="avatar">
                {{firstLitera}}
              </div>
              <div class="top-bar-info__data">
              <div class="top-bar-info__username">
                  {{selectedChat.title}}
              </div>
              </div>
          </div>
          
          <ChatDropdown />

          </header>
          <div class="chat">
          {% if props.chat.loading %}
              <LoadingIndicator />
          {% else %}
              <time class="message-time">
                  29 августа
              </time>
              {% for message in props.chat.messages %}
                  <Message
                      message={{message.message}}
                      isMy={{message.isMy}}
                      time={{message.time}}
                  />
              {% endfor %}
          {% endif %}
          </div>
          <footer class="message-bar">
          <div class="message-bar__attach">
              <img src={{attachUrl}} alt="attach" />
          </div>
          <div class="message-bar__input-wrap">
              <input
              class="message-bar__input"
              placeholder="Сообщение"
              type="text"
              />
              <div class="message-bar__send">
              <img src={{sendUrl}} alt="send" />
              </div>
          </div>
          </footer>
      </main>
      `,
      { attachUrl, sendUrl, selectedChat, firstLitera },
    ];
  }
}
