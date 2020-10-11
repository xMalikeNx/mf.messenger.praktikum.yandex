import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { AuthStore } from '../../stores/auth.store';
import { UiStore } from '../../stores/ui.store';
import { validate } from '../../utils/validate';

export type TRegistrationForm = {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export class RegistrationForm extends Component<TRegistrationForm> {
  authStore: AuthStore;
  uiStore: UiStore;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.state = {
      firstName: '',
      secondName: '',
      login: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    };

    this.authStore = AuthStore.getInstance() as AuthStore;
    this.authStore.subscribe(this);
    this.uiStore = UiStore.getInstance() as UiStore;
    this.uiStore.subscribe(this);
  }

  onChange = (e: KeyboardEvent): void => {
    const name = (e.target as HTMLInputElement).name as keyof TRegistrationForm;
    const value = (e.target as HTMLInputElement).value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (): void => {
    const {
      login,
      firstName,
      secondName,
      email,
      phone,
      password,
      rePassword,
    } = this.state;
    if (!this.validate()) {
      return;
    }
    
    if (
      !login ||
      !firstName ||
      !secondName ||
      !email ||
      !phone ||
      !password ||
      !rePassword
    ) {
      this.uiStore.showNotification(
        'Все поля должны быть заполнены.',
        'danger'
      );
      return;
    }

    if (password !== rePassword) {
      this.uiStore.showNotification('Пароли не совпадают', 'danger');
    }

    this.authStore.signUp({ ...this.state });
  };

  validate(): boolean {
    const {
      state: { login, firstName, secondName, phone, email, password },
    } = this;

    if (!validate(login)) {
      this.showValidationErrorNotification('Логин');
      return false;
    }

    if (!validate(firstName)) {
      this.showValidationErrorNotification('Имя');
      return false;
    }

    if (!validate(secondName)) {
      this.showValidationErrorNotification('Фамилия');
      return false;
    }

    if (!validate(phone, 'phone')) {
      this.showValidationErrorNotification('Телефон');
      return false;
    }

    if (!validate(email, 'email')) {
      this.showValidationErrorNotification('Email');
      return false;
    }

    if (!validate(password)) {
      this.showValidationErrorNotification('Пароль');
      return false;
    }

    return true;
  }

  showValidationErrorNotification(field: string): void {
    (UiStore.getInstance() as UiStore).showNotification(
      `${field} содержит недопустимые символы`,
      'danger'
    );
  }

  render(): [string, StateType?] {
    return [
      `
      <div class="form-wrap">
        <div class="form">
          <h4 class="form__title">Регистрация</h4>
          <InputField
            name="firstName"
            id="firstName"
            value="{{state.firstName}}"
            type="text"
            title="Имя"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="secondName"
            id="secondName"
            value="{{state.secondName}}"
            type="text"
            title="Фамилия"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="login"
            id="login"
            value="{{state.login}}"
            type="text"
            title="Логин"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="email"
            id="email"
            value="{{state.email}}"
            type="email"
            title="Email"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="password"
            id="password"
            value="{{state.password}}"
            onFieldChange={{onFieldChange}}
            type="password"
            title="Пароль"
          />
          <InputField
            name="rePassword"
            id="rePassword"
            value="{{state.rePassword}}"
            onFieldChange={{onFieldChange}}
            type="password"
            title="Подтверждение пароля"
          />
          <InputField
            name="phone"
            id="phone"
            value="{{state.phone}}"
            onFieldChange={{onFieldChange}}
            type="tel"
            title="Телефон"
          />
          <div class="form__button">
            <Button className="button" text="Зарегистрироваться" onClick={{onSubmit}} />
          </div>
          <div class="form__alt">
            Уже есть аккаунт?<br />
            <Link text="Войти" link="/login" />
          </div>
        </div>
      </div>
      `,
      { onFieldChange: this.onChange, onSubmit: this.onSubmit },
    ];
  }
}
