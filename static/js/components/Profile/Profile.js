import { isValid } from '../../utils/isValid.js';

export function Profile() {
  this.ctx = {
    formState: {
      login: 'Maliken',
      email: 'maliken.webdev@gmail.com',
      password: '',
      passwordOld: '',
      confirm: '',
    },
    borderColor: '',
    onFieldChange: (e) => {
      const {
        target: { value, name },
      } = e;

      if (!this.ctx.borderColor) {
        const borderColor = window
          .getComputedStyle(e.target, null)
          .getPropertyValue('border-color');
        this.ctx.borderColor = borderColor;
      }

      if (!isValid(value, true)) {
        e.target.style.borderColor = 'red';
      } else {
        e.target.style.borderColor = this.ctx.borderColor;
      }

      this.ctx.formState[name] = value;
    },
    onSubmit: (e) => {
      e.preventDefault();

      const inputs = e.target.querySelectorAll('input');
      if (Array.from(inputs).some((input) => !isValid(input.value))) {
        alert('Убедитсь в правильности введенных данных!');
      } else {
        console.log(this.ctx.formState);
      }
    },
  };
  this.render = function () {
    return `
      <div class="content-view">
        <div class="content-view-wrapper">
          <h2 class="content-view__title">Редактирование профиля</h2>
          <div class="content-view__user">
            <Avatar className="content-view__avatar">
              М
            </Avatar>  
            <div class="content-view__user-info">
              <div class="content-view__user-name">Maliken</div>
              <div class="content-view__user-email">maliken.webdev@gmail.com</div>
            </div>
          </div>
          <form id="profile-form" onSubmit={{onSubmit}}>
            <InputField
                name="login"
                required="required"
                value={{formState.login}}
                placeholder="Логин"
                label="Логин"
                onChange={{onFieldChange}}
              />  
            <InputField
              name="email"
              required="required"
              value={{formState.email}}
              placeholder="Email"
              label="Email"
              type="email"
              onChange={{onFieldChange}}
            />
            <InputField
              name="passwordOld"
              placeholder="Пароль"
              label="Старый пароль"
              type="password"
              onChange={{onFieldChange}}
            />  
            <InputField
              name="password"
              placeholder="Новый пароль"
              label="Новый пароль"
              type="password"
              onChange={{onFieldChange}}
            />
            <InputField
              name="passwordConfirm"
              placeholder="Подтверждение пароля"
              label="Подтверждение пароля"
              type="password"
              onChange={{onFieldChange}}
            />
            <div class="text-right">
              <Button type="submit" form="profile-form">Сохранить</Button>
            </div>
          </form>
        </div>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(Profile);
}
