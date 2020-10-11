import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { DialogsListStore, TDialogsState } from '../../stores/dialogs.store';
import { UiStore } from '../../stores/ui.store';
import { validate } from '../../utils/validate';

import './dialogsList.scss';

type TDialogListProps = {
  dialogs: TDialogsState;
};

export class DialogsList extends Component<any, TDialogListProps> {
  dialogsStore: DialogsListStore;

  constructor(props: TDialogListProps, parent?: Component) {
    super(props, parent);
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  componentDidMount(): void {
    const { dialogs } = this.props;
    if (!dialogs.loaded) {
      this.dialogsStore.fetchDialogs();
    }
  }

  componentWillUnmount(): void {
    this.dialogsStore.unsubscribe(this);
  }

  onSelectDialog = (dialogId: number): void => {
    this.dialogsStore.selectDialog(dialogId);
  };

  onSearchInputChange = (e: KeyboardEvent): void => {
    const value = (e.target as HTMLInputElement).value;
    if (!validate(value)) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Поле поиска содержит недопустимые символы',
        'danger'
      );
      return;
    }
    this.dialogsStore.changeSearch(value);
  };

  render(): [string, StateType?] {
    const dialogs = this.props.dialogs.items;
    const searchedDialogs = dialogs.filter((dialog) =>
      dialog.title
        .toLowerCase()
        .includes(this.props.dialogs.search.toLowerCase())
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
          {% if props.dialogs.items && !props.dialogs.loading %}
              {% for dialog in dialogs %}
                  <DialogListItem
                    {% if props.dialogs.selectedDialogId === dialog.id %}
                      selected={{true}}
                    {% endif %}
                    id={{dialog.id}}
                    title={{dialog.title}}
                    avatar={{dialog.avatar}}
                    onClick={{onSelectDialog}}
                  />
              {% endfor %}
          {% endif %}
          </ul>
          {% if !props.dialogs.items.length %}
            <div class="text-center">
              Список пуст
            </div>
          {% endif %}
          <CreateChatForm />
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
