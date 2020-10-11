import { parseJSON } from '../../core/Request/utils';
import { Store } from '../../core/Store';
import { UiStore } from '../../stores/ui.store';
import { TUserInfo } from '../../types';
import { Api } from '../../utils/Api';

export type UsersListModalState = {
  search: string;
  users: TUserInfo[];
};

export class UsersListModalStore extends Store<UsersListModalState> {
  api: Api;
  _displayName = 'entityStore';
  constructor() {
    super();
    this.api = new Api();
    this.state = {
      search: '',
      users: [],
    };
    this.fetchUsersBySearch();
  }

  fetchUsersBySearch = async (): Promise<void> => {
    try {
      const res = await this.api.post('user/search', {
        body: {
          login: this.state.search,
        },
      });
      const result = parseJSON<TUserInfo[]>(res.responseText);
      if (!result.isOk || !result.result) {
        (UiStore.getInstance() as UiStore).showNotification(
          'Не удалось получить список пользователей',
          'danger'
        );
      }
      this.updateState({
        users: result.result?.map((user) => ({
          ...user,
          avatar: user.avatar
            ? 'https://ya-praktikum.tech' + user.avatar
            : user.avatar,
        })),
      });
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось получить список пользователей: ${err.message}`,
        'danger'
      );
    }
  };

  inviteUser = async (id: number, dialogId: number): Promise<void> => {
    try {
      await this.api.put('chats/users', {
        body: {
          users: [id],
          chatId: dialogId,
        },
      });
      (UiStore.getInstance() as UiStore).showNotification(
        `Пользователь приглашен`,
        'success'
      );
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось пригласить пользователя: ${err.message}`,
        'danger'
      );
    }
  };

  changeSearch = (value: string): void => {
    this.updateState({
      search: value,
    });
    this.fetchUsersBySearch();
  };
}
