import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import {
  DialogItemType,
  DialogsListStore,
  DialogsState,
} from '../../stores/dialogs.store';

import './dialogsList.scss';

export class DialogsList extends Component {
  dialogsStore: DialogsListStore;

  constructor() {
    super();
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  onSelectDialog = (dialogId: number): void => {
    this.dialogsStore.selectDialog(dialogId);
  };

  onSearchInputChange = (e: KeyboardEvent): void => {
    this.dialogsStore.changeSearch((e.target as HTMLInputElement).value);
  };

  render(): [string, StateType?] {
    const dialogs = (this.props.dialogs as any).items as DialogItemType[];
    const searchedDialogs = dialogs.filter(
      (dialog) =>
        dialog.lastMessage
          .toLowerCase()
          .indexOf((this.props.dialogs as DialogsState).search.toLowerCase()) >=
          0 ||
        dialog.userName
          .toLowerCase()
          .indexOf((this.props.dialogs as DialogsState).search.toLowerCase()) >=
          0
    );

    return [
      `
      <aside class="dialogs-panel">
          <div class="search-input-wrapper">
          <button class="bars-button">
              <i class="bars-button__icon fa fa-bars"></i>
          </button>
          <SearchInput
            onChange={{onSearchInputChange}}
            value={{props.dialogs.search}}
            />
          </div>
          <ul class="dialogs__list">
          {% if !props.dialogs.items.length && props.dialogs.loading %}
              <LoadingIndicator />
          {% endif %}
          {% if props.dialogs.items.length %}
              {% for dialog in dialogs %}
                  <DialogListItem
                    {% if props.dialogs.selectedDialogId === dialog.id %}
                      selected={{true}}
                    {% endif %}
                    id={{dialog.id}}
                    userName={{dialog.userName}}
                    time={{dialog.time}}
                    isMy={{dialog.isMy}}
                    lastMessage={{dialog.lastMessage}}
                    background={{dialog.background}}
                    onClick={{onSelectDialog}}
                    unreadCount={{dialog.unreadCount}}
                  />
              {% endfor %}
          {% endif %}
          </ul>
      </aside>
      `,
      {
        onSelectDialog: this.onSelectDialog,
        dialogs: searchedDialogs,
        onSearchInputChange: this.onSearchInputChange,
      },
    ];
  }
}
