import { MNRequest } from '../core/Request/Request.js';
import { parseJSON } from '../core/Request/utils.js';
import { Store } from '../core/Store.js';
import { Api } from '../utils/Api.js';

export type DialogItemType = {
  id: number;
  lastMessage: string;
  isMy: boolean;
  time: Date;
  userName: string;
};

export type DialogsState = {
  loading: boolean;
  items: DialogItemType[];
  selectedDialogId: number | null;
  search: string;
};

export class DialogsListStore extends Store {
  private api: Api;

  constructor() {
    super();
    this._displayName = 'dialogs';
    this.state = {
      loading: true,
      items: [],
      selectedDialogId: null,
      search: '',
    };
    this.api = new Api();
  }

  public async startLoadItems() {
    const res = await this.api.get('mock/dialogs.json');
    const items = parseJSON(res.responseText);
    if (items.isOk) {
      this.updateState({
        loading: false,
        items: items.result,
      });
    }
  }

  public selectDialog(dialogId: number): void {
    const { selectedDialogId, items } = this.state as DialogsState;
    if (!items.length) {
      return;
    }

    const selectedItem = items.find((item) => item.id === dialogId);
    if (!selectedItem || selectedItem.id === selectedDialogId) {
      return;
    }

    this.updateState({
      selectedDialogId: selectedItem.id,
    });
  }

  changeSearch = (value: string) => {
    this.updateState({
      search: value,
    });
  };
}
