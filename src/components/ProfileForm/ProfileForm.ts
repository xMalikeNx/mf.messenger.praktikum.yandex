import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { ProfileStore } from '../../stores/profile.store';

export class ProfileForm extends Component {
  private profileStore: ProfileStore;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.profileStore = ProfileStore.getInstance() as ProfileStore;
    this.profileStore.subscribe(this);
  }

  render(): [string, StateType?] {
    return [
      `
      <div>
        <h2 class="content-view__title">Редактирование профиля</h2>
        <div class="content-view__user">
          <div class="avatar content-view__avatar">
            M
          </div>
          <div class="content-view__user-info">
            <div class="content-view__user-name">{{props.profile.login}}</div>
            <div class="content-view__user-email">{{props.profile.email}}</div>
          </div>
        </div>
        <div class="form">
          <InputField
            value="{{props.profile.login}}"
            name="login"
            id="login"
            type="text"
            title="Логин"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.email}}"
            name="email"
            id="email"
            type="email"
            title="Email"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.password}}"
            name="password"
            id="password"
            type="password"
            title="Старый пароль"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.newPassword}}"
            name="newPassword"
            id="newPassword"
            type="password"
            title="Новый пароль"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.rePassword}}"
            name="rePassword"
            id="rePassword"
            type="password"
            title="Подтверждение пароля"
            onFieldChange={{onFieldChange}}
          />
          </div>
          <div class="text-right">
            <button onClick={{onSubmit}} class="button">Сохранить</button>
          </div>
        </div>
      </div>
      `,
      {
        onFieldChange: this.profileStore.onFieldChange,
        onSubmit: this.profileStore.onFormSubmit,
      },
    ];
  }
}
