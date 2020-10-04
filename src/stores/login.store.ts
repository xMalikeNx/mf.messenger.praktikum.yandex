import { Store } from '../core/Store';

export type LoginState = {
  login: string;
  password: string;
};

export class LoginStore extends Store {
  constructor() {
    super();
    this._displayName = 'login';
    (this.state as LoginState) = {
      login: '',
      password: '',
    };
  }

  onFieldChange = (e: KeyboardEvent): void => {
    const { name, value } = e.target as HTMLInputElement;
    this.updateState({
      [name]: value,
    });
  };

  onFormSubmit = (): void => {
    const errors: string[] = [];

    if (this.state.login !== 'admin' || this.state.password !== 'hello') {
      errors.push('Логин или пароль введены не верно');
    }

    if (!errors.length) {
      alert('Форма успешно отправлена');
    } else {
      alert(errors.join('\n'));
    }
  };
}
