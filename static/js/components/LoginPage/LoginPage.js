import { validateField } from '../../utils/validateField.js';

export function LoginPage() {
  this.ctx = {
    onChange: (e) => {
      const {
        target: { value, name },
      } = e;

      if (!this.ctx.borderColor) {
        const borderColor = window
          .getComputedStyle(e.target, null)
          .getPropertyValue('border-color');
        this.ctx.borderColor = borderColor;
      }

      if (!validateField(value)) {
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = this.ctx.borderColor;
      }
      this.ctx.formState[name] = value;
    },
    onSubmit: (e) => {
      console.log('on submit');
      e.preventDefault();
      if (
        Object.values(this.ctx.formState).some((value) => !validateField(value))
      ) {
        alert('Убедитесь в правильности введенной информации');
      } else {
        console.log(this.ctx.formState);
      }
    },
    formState: {
      login: '',
      password: '',
    },
    borderColor: '',
  };
  this.render = function () {
    return `
      <div class="app gradient-page">
        <div class="form-wrap">
          <form id="login-form" onSubmit={{onSubmit}} class="form">
            <h4 class="form__title">Авторизация</h4>
            <InputField
              name="login"
              placeholder="Логин"
              onChange={{onChange}}
            />
            <InputField
              placeholder="Пароль"
              name="password"
              type="password"
              onChange={{onChange}}
            />
            <div class="form__button">
              <Button type="submit">
                Войти
              </Button>
            </div>
            <div class="form__alt">
              Нет аккаунта?<br />
              <a href="/registration.html">Зарегистрироваться</a>
            </div>
          </form>
        </div>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(LoginPage);
}
