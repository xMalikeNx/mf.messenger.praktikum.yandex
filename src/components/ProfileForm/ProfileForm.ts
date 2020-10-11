import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { ProfileStore, TProfileState } from '../../stores/profile.store';

type TProfileFormProps = {
  profile: TProfileState;
};

export class ProfileForm extends Component<any, TProfileFormProps> {
  private profileStore: ProfileStore;

  constructor(props: TProfileFormProps, parent?: Component) {
    super(props, parent);

    this.profileStore = ProfileStore.getInstance() as ProfileStore;
    this.profileStore.subscribe(this);
  }

  onChangeAvatar = (e: MouseEvent): void => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }

    this.profileStore.changeAvatar(target.files);
  };

  render(): [string, StateType?] {
    return [
      `
      <div>
        <h2 class="content-view__title">Редактирование профиля</h2>
        <div class="content-view__user">
          <Avatar title="M" url={{props.profile.avatar}} className="content-view__avatar" />
          <div class="content-view__user-info">
            <div class="content-view__user-name">{{props.profile.login}}</div>
            <div class="content-view__user-email">{{props.profile.email}}</div>
          </div>
        </div>
        <div class="form">
          <div class="input-block">
            <label class="input-block__label" for="avatar">Аватар</label>
            <input type="file" id="avatar" onChange={{onChangeAvatar}} accept="image/jpeg,image/png" />
          </div>
          <InputField
            value="{{props.profile.firstName}}"
            name="firstName"
            id="firstName"
            type="text"
            title="Имя"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.secondName}}"
            name="secondName"
            id="secondName"
            type="text"
            title="Фамилия"
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
            value="{{props.profile.login}}"
            name="login"
            id="login"
            type="text"
            title="Логин"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.displayName}}"
            name="displayName"
            id="displayName"
            type="text"
            title="Display name"
            onFieldChange={{onFieldChange}}
          />
          <InputField
            value="{{props.profile.phone}}"
            name="phone"
            id="phone"
            type="tel"
            title="Телефон"
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
            title="Повторите пароль"
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
        onChangeAvatar: this.onChangeAvatar,
        onFieldChange: this.profileStore.onChange,
        onSubmit: this.profileStore.updateUser,
      },
    ];
  }
}
