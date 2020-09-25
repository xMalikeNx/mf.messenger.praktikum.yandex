import { Store } from '../core/Store.js';
import { Api } from '../utils/Api.js';
import { validate } from '../utils/validate.js';

export type ProfileState = {
  login: string;
  email: string;
  password: string;
  newPassword: string;
  rePassword: string;
};

export class ProfileStore extends Store {
  constructor() {
    super();
    this._displayName = 'profile';
    (this.state as ProfileState) = {
      login: 'Maliken',
      email: 'maliken.webdev@gmail.com',
      password: '',
      newPassword: '',
      rePassword: '',
    };
  }

  onFieldChange = (e: KeyboardEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    this.updateState({
      [name]: value,
    });
  };

  onFormSubmit = () => {
    let errors: string[] = [];

    if (!validate(this.state.login as string)) {
      errors.push('Логин введен не верно');
    }

    if (!validate(this.state.email as string, 'email')) {
      errors.push('Email введен не верно');
    }

    if ((this.state.password as string).length) {
      if ((this.state.password as string) !== 'hi') {
        errors.push('Старый пароль введен не верно');
      }

      if (
        (this.state.newPassword as string) !== (this.state.rePassword as string)
      ) {
        errors.push('Введенные пароли не совпадают');
      }
    }

    if (!errors.length) {
      alert('Форма успешно отправлена');
    } else {
      alert(errors.join('\n'));
    }
  };
}
