import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types.js';
import { getFirstLitera } from '../../utils/getFirstLitera.js';

type DialogListItemProps = {
  id: number | string;
  userName: string;
  onClick: (dialogId: number) => void;
};

export class DialogListItem extends Component {
  onSelectDialog = () => {
    const { onClick, id } = this.props as DialogListItemProps;

    if (typeof onClick === 'function') {
      onClick(typeof id === 'number' ? id : parseInt(id));
    }
  };

  render(): [string, StateType?] {
    const firstLitera = getFirstLitera(
      (this.props as DialogListItemProps).userName
    );

    return [
      `
      <li onClick={{onSelectDialog}}>
        <div 
            {% if props.selected %}
            class="dialog-item current"
            {% else %}
            class="dialog-item"
            {% endif %}
        >
        <Avatar background="{{props.background}}" title="{{firstLitera}}" />
        <div class="dialog-item__info">
            <div class="dialog-item__username">
            {{props.userName}}
            </div>
            <div class="dialog-item__message">
            {{props.lastMessage}}
            </div>
            </div>
                <div class="dialog-item__status-block">
                {% if props.isMy %}
                    <span class="dialog-item__check">
                    <img src="/img/icons/check.svg" alt="check" />
                    </span>
                {% else %}
                    <div class="dialog-item__indicator">
                    {{props.unreadCount}}
                    </div>
                {% endif %}    
                    <time class="dialog-item__time">
                        {{props.time}}
                    </time>
                    </div>
                </div>
            </li>
      `,
      { firstLitera, onSelectDialog: this.onSelectDialog },
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('DialogListItem', DialogListItem);
}
