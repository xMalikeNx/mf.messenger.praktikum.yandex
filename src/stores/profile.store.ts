import { Store } from '../core/Store';
import { ProfileApi } from '../services/profile.api';
import { TUserDto, TUserInfo } from '../types';
import { AuthStore } from './auth.store';
import { UiStore } from './ui.store';

export type TProfileState = Omit<TUserInfo, 'id'> & {
  password: string;
  newPassword: string;
  rePassword: string;
};

export class ProfileStore extends Store<TProfileState> {
  api: ProfileApi;

  constructor() {
    super();
    this._displayName = 'profile';
    this.state = {
      firstName: '',
      secondName: '',
      login: '',
      email: '',
      phone: '',
      password: '',
      newPassword: '',
      rePassword: '',
      displayName: '',
      avatar: '',
    };
    this.api = new ProfileApi();
  }

  onChange = (e: KeyboardEvent): void => {
    const name = (e.target as HTMLInputElement).name as keyof TProfileState;
    const value = (e.target as HTMLInputElement).value;

    this.updateState({
      [name]: value,
    });
  };

  updateUser = async (): Promise<void> => {
    try {
      const { state } = this;
      const userInfo: Partial<TUserDto> = {
        display_name: state.displayName,
        first_name: state.firstName,
        second_name: state.secondName,
        login: state.login,
        phone: state.phone,
        email: state.email,
      };

      if (state.password) {
        if (state.newPassword !== state.rePassword) {
          (UiStore.getInstance() as UiStore).showNotification(
            'Не удалось обновить профиль пользователя',
            'danger'
          );
          return;
        }
        userInfo.password = state.newPassword;
      }

      await this.api.updateUserInfo(userInfo);
      (AuthStore.getInstance() as AuthStore).getUserInfo();
      (UiStore.getInstance() as UiStore).showNotification(
        'Профиль пользователя успешно обновлен',
        'success'
      );
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Не удалось обновить профиль пользователя',
        'danger'
      );
    }
  };

  changeAvatar = async (files: FileList): Promise<void> => {
    if (!files.length) {
      return;
    }

    try {
      await this.api.updateAvatar(files[0]);
      (AuthStore.getInstance() as AuthStore).getUserInfo();
    } catch (err) {
      (UiStore.getInstance() as UiStore).showNotification(
        `Не удалось обновить аватар: ${err.message}`,
        'danger'
      );
    }
  };

  setUserInfo = (userInfo: TUserInfo): void => {
    this.updateState({ ...this.state, ...userInfo });
  };
}
