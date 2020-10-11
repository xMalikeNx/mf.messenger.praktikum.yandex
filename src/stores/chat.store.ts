import { Store } from '../core/Store';
import chatMock from './mock/chat.mock';

export type DialogMessageType = {
  id: number | string;
  isMy: boolean;
  time: string;
  message: string;
};

export class ChatStore extends Store {
  constructor() {
    super();
    this._displayName = 'chat';
    this.state = {
      loading: false,
      messages: chatMock,
    };
  }
}
