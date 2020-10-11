import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { getFirstLitera } from '../../utils/getFirstLitera';

import './dialogListItem.scss';

type TDialogListItemProps = {
  id: number;
  title: string;
  avatar?: string;
  onClick: (dialogId: number) => void;
};

export class DialogListItem extends Component<unknown, TDialogListItemProps> {
  onSelectDialog = (): void => {
    const { onClick, id } = this.props;

    if (typeof onClick === 'function') {
      onClick(typeof id === 'number' ? id : parseInt(id));
    }
  };

  render(): [string, StateType?] {
    const firstLitera = getFirstLitera(this.props.title);
    
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
        <Avatar url={{props.avatar}} title="{{firstLitera}}" />
        <div class="dialog-item__info">
          <div class="dialog-item__username">
            {{props.title}}
          </div>
        </div>
        </div>
      </li>
      `,
      { firstLitera, onSelectDialog: this.onSelectDialog },
    ];
  }
}
