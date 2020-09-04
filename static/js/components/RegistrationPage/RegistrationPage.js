import { validateField } from '../../utils/validateField.js';

export function RegistrationPage() {
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
      passwordConfirm: '',
    },
    borderColor: '',
  };
  this.render = function () {
    return `
      <div class="app gradient-page">
        <div class="form-wrap">
          <form class="form" onSubmit={{onSubmit}}>
            <h4 class="form__title">Регистрация</h4>
            <InputField
              onChange={{onChange}}
              name="login"
              placeholder="Логин"
            />
            <InputField
              onChange={{onChange}}
              name="password"
              type="password"
              placeholder="Пароль"
            />
            <InputField
              onChange={{onChange}}
              name="passwordConfirm"
              type="password"
              placeholder="Подтверждение пароля"
            />
            <div class="form__button">
              <Button type="submit">
                Зарегистрироваться
              </Button>
            </div>
            <div class="form__alt">
              Уже есть аккаунт<br />
              <a href="/login.html">Войти</a>
            </div>
          </form>
        </div>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(RegistrationPage);
}
