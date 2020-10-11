import { Store } from '../core/Store';
import { DialogsApi } from '../services/dialogs.api';
import { TUserInfo } from '../types';
import { UiStore } from './ui.store';

export type DialogItemType = {
  id: number;
  title: string;
  avatar: string;
};

export type TDialogsState = {
  loaded: boolean;
  loading: boolean;
  items: DialogItemType[];
  selectedDialogId: number | null;
  selectedChatUsers: TUserInfo[];
  search: string;
};

export class DialogsListStore extends Store<TDialogsState> {
  private api: DialogsApi;

  constructor() {
    super();
    this._displayName = 'dialogs';
    this.state = {
      loaded: false,
      loading: false,
      items: [],
      selectedDialogId: null,
      search: '',
      selectedChatUsers: [],
    };
    this.api = new DialogsApi();
  }

  public async fetchDialogs(): Promise<void> {
    try {
      this.updateState({
        loading: true,
        loaded: true,
      });
      const dialogs = await this.api.fetchDialogs();

      this.updateState({
        items: dialogs.map((dialog) =>
          !dialog.title ? { ...dialog, title: 'Unnamed' } : dialog
        ),
        loading: false,
      });
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Не удалось получить список чатов',
        'danger'
      );
    }
  }

  public async deleteUser(id: number): Promise<void> {
    if (!this.state.selectedDialogId) {
      return;
    }
    try {
      await this.api.deleteUser(id, this.state.selectedDialogId);
      (UiStore.getInstance() as UiStore).showNotification(
        'Пользователь исключен из чата',
        'success'
      );
    } catch (err) {
      console.error(err);
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось исключить пользователя из чата ${err.message}`,
        'danger'
      );
    }
  }

  public async createChat(title: string): Promise<void> {
    try {
      this.api.createChat(title);
      (UiStore.getInstance() as UiStore).showNotification(
        'Чат успешно создан',
        'success'
      );
      this.fetchDialogs();
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось создать чат: ${err.message}`
      );
    }
  }

  public selectDialog(dialogId: number): void {
    const { selectedDialogId, items } = this.state as TDialogsState;
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

    this.fetchSelectedChatUsers();
  }

  async fetchSelectedChatUsers(): Promise<void> {
    if (this.state.selectedDialogId === null) {
      return;
    }

    try {
      const users = await this.api.fetchChatUsers(this.state.selectedDialogId);
      this.updateState({
        selectedChatUsers: users.map((user) => ({
          ...user,
          avatar: user.avatar
            ? 'https://ya-praktikum.tech' + user.avatar
            : user.avatar,
        })),
      });
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось получить список пользователей для текущего чата: ${err.message}`,
        'danger'
      );
    }
  }

  changeSearch = (value: string): void => {
    this.updateState({
      search: value,
    });
  };
}
