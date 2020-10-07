import { Router } from '../core/Router/Router';
import { Store } from '../core/Store';
import { AuthApi } from '../services/auth.api';
import { TUserInfo } from '../types';
import { UiStore } from './ui.store';

type TAuthStore = {
  isLoggedIn: boolean;
  user?: TUserInfo;
};

export class AuthStore extends Store<TAuthStore> {
  api: AuthApi;

  constructor() {
    super();
    this._displayName = 'auth';
    this.state = {
      user: {} as TUserInfo,
      isLoggedIn: false,
    };
    this.api = new AuthApi();
  }

  async signIn(login: string, password: string): Promise<void> {
    try {
      await this.api.signIn(login, password);
      await this.getUserInfo();
      (UiStore.getInstance() as UiStore).showNotification(
        'Успешная авторизация',
        'success'
      );
      Router.getInstance().go('/chats');
    } catch (err) {
      const { message } = err;
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось авторизироваться: ${message}`,
        'danger'
      );
    }
  }

  async getUserInfo(): Promise<void> {
    try {
      const userInfo = await this.api.getUserInfo();
      this.updateState({
        user: { ...userInfo },
        isLoggedIn: true,
      });
    } catch (err) {
      const { message } = err;
      alert(message);
    }
  }
}
