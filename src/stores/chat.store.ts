import { MNRequest } from '../core/Request/Request.js';
import { parseJSON } from '../core/Request/utils.js';
import { Store } from '../core/Store.js';
import { Api } from '../utils/Api.js';

export type DialogMessageType = {
  id: number | string;
  isMy: boolean;
  time: string;
  message: string;
};

export class ChatStore extends Store {
  private api: Api;

  constructor() {
    super();
    this._displayName = 'chat';
    this.state = {
      loading: true,
      messages: [],
    };
    this.api = new Api();
  }

  fetchMessagesFromDialog = async (dialogId: number) => {
    this.updateState({
      loading: true,
    });
    const res = await this.api.get(`mock/messages${dialogId}.json`);
    const items = parseJSON(res.responseText);
    if (items.isOk) {
      this.updateState({
        messages: items.result,
        loading: false,
      });
    }
  };
}
