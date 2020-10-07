import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { ChatStore } from '../../stores/chat.store';

import './chatPanel.scss';

export class ChatPanel extends Component {
  private chatStore: ChatStore;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.chatStore = ChatStore.getInstance() as ChatStore;
    this.chatStore.subscribe(this);
  }

  componentDidMount(): void {
    this.chatStore.fetchMessagesFromDialog(
      parseInt(this.props.selectedChatId as string)
    );
  }

  render(): [string, StateType?] {
    return [
      `
      <main class="chat-panel">
          <header class="top-bar">
          <button class="back-button">
              <img
              class="back-button__icon"
              src="/img/icons/back.svg"
              alt="back"
              />
          </button>
          <div class="top-bar-info">
              <div class="avatar">
              М
              </div>
              <div class="top-bar-info__data">
              <div class="top-bar-info__username">
                  Мур
              </div>
              <time class="top-bar-info__lastvisit">
                  был в сети 20 минут назад
              </time>
              </div>
          </div>
          <div class="settings-wrap">
              <div class="dots-icon">
              <img
                  class="dots-icon__img"
                  src="/img/icons/dots.svg"
                  alt="dots"
              />
              </div>
          </div>
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
              <img src="/img/icons/attach.svg" alt="attach" />
          </div>
          <div class="message-bar__input-wrap">
              <input
              class="message-bar__input"
              placeholder="Сообщение"
              type="text"
              />
              <div class="message-bar__send">
              <img src="/img/icons/send.svg" alt="send" />
              </div>
          </div>
          </footer>
      </main>
      `,
    ];
  }
}
