import { TRegistrationForm } from '../components/RegistrationForm/RegistrationForm';
import { Router } from '../core/Router/Router';
import { Store } from '../core/Store';
import { AuthApi } from '../services/auth.api';
import { TUserInfo } from '../types';
import { ProfileStore } from './profile.store';
import { UiStore } from './ui.store';

export type TAuthStore = {
  isLoggedIn: boolean;
  user?: TUserInfo;
};

export class AuthStore extends Store<TAuthStore> {
  api: AuthApi;
  chatsUrl = 'chat';

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
      Router.getInstance().go(this.chatsUrl);
    } catch (err) {
      const { message } = err;
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось авторизироваться: ${message}`,
        'danger'
      );
    }
  }

  async signUp(fields: TRegistrationForm): Promise<void> {
    try {
      await this.api.signUp(fields);
      (UiStore.getInstance() as UiStore).showNotification(
        'Вы успешно зарегистрировались',
        'success'
      );
      await this.getUserInfo();
      Router.getInstance().go(this.chatsUrl);
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось зарегистрироваться: ${err.message}`,
        'danger'
      );
    }
  }

  logOut = async (): Promise<void> => {
    try {
      await this.api.logOut();
      window.location.reload();
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось выйти: ${err.message}`,
        'danger'
      );
    }
  };

  async getUserInfo(): Promise<void> {
    try {
      const userInfo = await this.api.getUserInfo();
      this.updateState({
        user: {
          ...userInfo,
          avatar: userInfo.avatar
            ? 'https://ya-praktikum.tech' + userInfo.avatar
            : null,
        },
        isLoggedIn: true,
      });
      (ProfileStore.getInstance() as ProfileStore).setUserInfo(userInfo);
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Не удалось получить данные о пользователе',
        'info'
      );
    }
  }
}
