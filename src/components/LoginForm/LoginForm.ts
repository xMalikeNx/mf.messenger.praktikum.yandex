import { Component } from '../../core/Component.js';
import { StateType } from '../../core/types';
import { LoginStore } from '../../stores/login.store.js';

export class LoginForm extends Component {
  private loginStore: LoginStore;

  constructor() {
    super();
    this.loginStore = LoginStore.getInstance() as LoginStore;
    this.loginStore.subscribe(this);
  }

  render(): [string, StateType?] {
    return [
      `
        <div class="form-wrap">
        <div class="form">
          <h4 class="form__title">Авторизация</h4>
          <InputField
            name="login"
            id="login"
            value="{{props.login.login}}"
            type="text"
            title="Логин"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="password"
            id="password"
            value="{{props.login.password}}"
            onFieldChange={{onFieldChange}}
            type="password"
            title="Пароль"
          />
          <div class="form__button">
            <Button className="button" text="Войти" onClick={{onSubmit}} />
          </div>
          <div class="form__alt">
            Нет аккаунта?<br />
            <Link text="Зарегистрироваться" link="/registration" />
          </div>
        </div>
      </div>
        `,
      {
        onSubmit: this.loginStore.onFormSubmit,
        onFieldChange: this.loginStore.onFieldChange,
      },
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('LoginForm', LoginForm);
}
