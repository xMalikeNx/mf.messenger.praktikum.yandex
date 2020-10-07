import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { AuthStore } from '../../stores/auth.store';

type TLoginForm = {
  login: string;
  password: string;
};

export class LoginForm extends Component<TLoginForm> {
  private authStore: AuthStore;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);
    this.state = {
      login: '',
      password: '',
    };
    this.authStore = AuthStore.getInstance() as AuthStore;
    this.authStore.subscribe(this);
  }

  onChange = (e: KeyboardEvent): void => {
    const name = (e.target as HTMLInputElement).name as keyof TLoginForm;
    const value = (e.target as HTMLInputElement).value;
    console.log(name);
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (): void => {
    this.authStore.signIn(this.state.login, this.state.password);
  };

  render(): [string, StateType?] {
    return [
      `
      <div class="form-wrap">
        <div class="form">
          <h4 class="form__title">Авторизация</h4>
          <InputField
            name="login"
            id="login"
            value="{{state.login}}"
            type="text"
            title="Логин"
            onFieldChange={{onChange}}
          />
          <InputField
            name="password"
            id="password"
            value="{{state.password}}"
            onFieldChange={{onChange}}
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
        onChange: this.onChange,
        onSubmit: this.onSubmit,
      },
    ];
  }
}
