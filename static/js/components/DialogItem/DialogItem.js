import { getFirstChars } from '../../utils/getFirstChars.js';

export function DialogItem({
  onClick,
  id,
  isMy,
  time,
  lastMessage,
  checked,
  userName,
  selectedChat,
  selected,
}) {
  const avatarChars = getFirstChars(userName);
  this.onDialogClick = () => {
    if (typeof onClick === 'function') {
      onClick(parseInt(id));
    }
  };

  this.ctx = {
    onDialogClick: this.onDialogClick,
    avatarChars,
  };
  this.render = function () {
    return `
      <li onClick={{onDialogClick}} data-dialog-id={{id}}>
        {% if selected %}
          <div class="dialog-item current">
        {% else %}
          <div class="dialog-item">
        {% endif %}
          <Avatar background={{background}}>
            {{avatarChars}}
          </Avatar>
          <div class="dialog-item__info">
            <div class="dialog-item__username">
              {{userName}}
            </div>
            <div class="dialog-item__message">
              {% if isMy %}
                <strong>Я: </strong>
              {% endif %}
             {{lastMessage}}
            </div>
          </div>
          <div class="dialog-item__status-block">
            {% if isMy %}
            <span class="dialog-item__check">
              <img src="/img/icons/check.svg" alt="check" />
            </span>
            {% else %}
            <div class="dialog-item__indicator">
              {{unreadCount}}
            </div>
            {% endif %}
            <time class="dialog-item__time">
              12:00
            </time>
          </div>
        </div>
      </li>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(DialogItem);
}
