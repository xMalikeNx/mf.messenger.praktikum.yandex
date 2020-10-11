import { parseJSON } from '../core/Request/utils';
import { DialogItemType } from '../stores/dialogs.store';
import { TUserInfo } from '../types';
import { Api } from '../utils/Api';

export class DialogsApi extends Api {
  createChat(title: string): Promise<XMLHttpRequest> {
    return this.post('chats', {
      body: {
        title,
      },
    });
  }

  async fetchDialogs(): Promise<DialogItemType[]> {
    const res = (await this.get('chats')).responseText;
    const result = parseJSON<DialogItemType[]>(res);
    if (result.isOk && result.result) {
      return result.result;
    }

    throw new Error('Json is not valid');
  }

  async fetchChatUsers(chatId: number): Promise<TUserInfo[]> {
    const res = (await this.get(`chats/${chatId}/users`)).responseText;
    const result = parseJSON<TUserInfo[]>(res);
    if (!result.isOk || !result.result) {
      throw new Error('Json is not valid');
    }

    return result.result;
  }

  deleteUser(userId: number, chatId: number): Promise<XMLHttpRequest> {
    return this.delete('chats/users', {
      body: {
        users: [userId],
        chatId,
      },
    });
  }
}
