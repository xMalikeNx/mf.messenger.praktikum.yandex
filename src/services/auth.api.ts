import { TRegistrationForm } from '../components/RegistrationForm/RegistrationForm';
import { parseJSON } from '../core/Request/utils';
import { TUserDto, TUserInfo } from '../types';
import { Api } from '../utils/Api';

export class AuthApi extends Api {
  signIn(login: string, password: string): Promise<XMLHttpRequest> {
    return this.post('auth/signin', {
      body: {
        login,
        password,
      },
    });
  }

  logout(): Promise<XMLHttpRequest> {
    return this.post('auth/logout');
  }

  signUp(userData: TRegistrationForm): Promise<XMLHttpRequest> {
    return this.post('auth/signup', {
      body: {
        first_name: userData.firstName,
        second_name: userData.secondName,
        login: userData.login,
        password: userData.password,
        email: userData.email,
        phone: userData.phone,
      },
    });
  }

  logOut(): Promise<XMLHttpRequest> {
    return this.post('auth/logout');
  }

  async getUserInfo(): Promise<TUserInfo> {
    const res = (await this.get('auth/user')).responseText;
    const { isOk, result } = parseJSON<TUserDto>(res);
    if (!isOk || !result) {
      throw new Error('JSON is not valid!');
    }

    return {
      id: result.id,
      displayName: result.display_name,
      firstName: result.first_name,
      secondName: result.second_name,
      login: result.login,
      email: result.email,
      phone: result.phone,
      avatar: result.avatar,
    };
  }
}
