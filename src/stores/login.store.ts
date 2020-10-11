import { Store } from '../core/Store';
import { AuthApi } from '../services/auth.api';
import { TUserDto, TUserInfo } from '../types';

type TFormParams = {
  login: string;
  password: string;
};

export type AuthState = {
  form: TFormParams;
  user?: TUserInfo;
};

export class LoginStore extends Store<AuthState> {
  api: AuthApi;

  constructor() {
    super();
    this._displayName = 'auth';
    this.state = {
      form: {
        login: '',
        password: '',
      },
    };
    this.api = new AuthApi();
  }

  setUserData = (userDto: TUserDto): void => {
    this.updateState({
      user: {
        firstName: userDto.first_name,
        secondName: userDto.second_name,
        login: userDto.login,
        phone: userDto.phone,
        email: userDto.email,
        id: userDto.id,
        displayName: userDto.display_name,
        avatar: userDto.avatar,
      },
    });
  };

  onFieldChange = (e: KeyboardEvent): void => {
    const name = (e.target as HTMLInputElement).name as keyof TFormParams;
    const value = (e.target as HTMLInputElement).value;

    this.updateState({
      form: {
        [name]: value,
      },
    });
  };

  onFormSubmit = async (): Promise<void> => {
    try {
      await this.api.signIn(this.state.form.login, this.state.form.password);
    } catch (err) {
      const { message } = err;
      alert(message);
    }
  };
}
