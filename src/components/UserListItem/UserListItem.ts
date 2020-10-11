import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { getFirstLitera } from '../../utils/getFirstLitera';

type TUserListItemProps = {
  id: number;
  avatar: string;
  login: string;
  withRemove: boolean;
  onRemove?: (id: number) => void;
  onItemClick?: (id: number) => void;
};

export class UserListItem extends Component<any, TUserListItemProps> {
  onClick = (): void => {
    if (typeof this.props.onItemClick === 'function') {
      this.props.onItemClick(this.props.id);
    }
  };

  onRemove = (): void => {
    if (typeof this.props.onRemove === 'function') {
      this.props.onRemove(this.props.id);
    }
  };

  render(): [string, StateType?] {
    const firstLitera = getFirstLitera(this.props.login ?? 'U');

    return [
      `
      <li class="users-list-item" data-user-id={{props.id}} onClick={{onClick}}>
        <div class="users-list-item__info">
          <Avatar url={{props.avatar}} title={{firstLitera}} />
          <span class="users-list-item__name">{{props.login}}</span>
        </div> 
        {% if props.withRemove %}
          <button onClick={{onRemove}} class="users-list-item__remove">
            <i class="fa fa-times" />
          </button>
        {% endif %}
      </li>
      `,
      { onClick: this.onClick, onRemove: this.onRemove, firstLitera },
    ];
  }
}
