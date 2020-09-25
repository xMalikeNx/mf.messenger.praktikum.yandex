import { Store } from '../core/Store.js';
import { Api } from '../utils/Api.js';
import { validate } from '../utils/validate.js';

export type RegistrationState = {
  login: string;
  password: string;
  rePassword: string;
};

export class RegistrationStore extends Store {
  constructor() {
    super();
    this._displayName = 'registration';
    (this.state as RegistrationState) = {
      login: '',
      password: '',
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
      errors.push('Логин содержит недопустимые символы');
    }

    if (this.state.password !== this.state.rePassword) {
      errors.push('Пароли не совпадают');
    }

    if (!validate(this.state.password as string)) {
      errors.push('Пароль содержит недопустимые символы');
    }

    if (!validate(this.state.rePassword as string)) {
      errors.push('Подтверждение пароля содержит недопустимые символы');
    }

    if (!errors.length) {
      alert('Форма успешно отправлена');
    } else {
      alert(errors.join('\n'));
    }
  };
}
