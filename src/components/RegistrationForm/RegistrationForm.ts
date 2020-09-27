import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { RegistrationStore } from '../../stores/registration.store';

export class RegistrationForm extends Component {
  registrationStore: RegistrationStore;

  constructor() {
    super();

    this.registrationStore = RegistrationStore.getInstance() as RegistrationStore;
    this.registrationStore.subscribe(this);
  }

  render(): [string, StateType?] {
    return [
      `
      <div class="form-wrap">
        <div class="form">
          <h4 class="form__title">Регистрация</h4>
          <InputField
            name="login"
            id="login"
            value="{{props.registration.login}}"
            type="text"
            title="Логин"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            name="password"
            id="password"
            value="{{props.registration.password}}"
            onFieldChange={{onFieldChange}}
            type="password"
            title="Пароль"
          />
          <InputField
            name="rePassword"
            id="rePassword"
            value="{{props.registration.rePassword}}"
            onFieldChange={{onFieldChange}}
            type="password"
            title="Пароль"
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
      {
        onFieldChange: this.registrationStore.onFieldChange,
        onSubmit: this.registrationStore.onFormSubmit,
      },
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('RegistrationForm', RegistrationForm);
}
