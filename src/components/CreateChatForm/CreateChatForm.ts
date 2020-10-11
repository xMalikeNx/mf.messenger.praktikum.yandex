import { Component } from '../../core/Component';
import { StateType } from '../../core/types';
import { DialogsListStore, TDialogsState } from '../../stores/dialogs.store';
import { UiStore } from '../../stores/ui.store';
import { validate } from '../../utils/validate';
import './createChatForm.scss';

type TCreateChatFormProps = {
  dialogs: TDialogsState;
};

type TCreateChatFormState = {
  title: string;
  isFormOpened: boolean;
};

export class CreateChatForm extends Component<
  TCreateChatFormState,
  TCreateChatFormProps
> {
  dialogsStore: DialogsListStore;

  constructor(props: TCreateChatFormProps, parent?: Component) {
    super(props, parent);

    this.state = {
      title: '',
      isFormOpened: false,
    };
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  onChange = (e: KeyboardEvent): void => {
    const name = (e.target as HTMLInputElement)
      .name as keyof TCreateChatFormState;
    const value = (e.target as HTMLInputElement).value;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (): void => {
    if (!validate(this.state.title)) {
      (UiStore.getInstance() as UiStore).showNotification(
        'Поле содержит недопустимые символы',
        'danger'
      );
      return;
    }

    this.dialogsStore.createChat(this.state.title);
  };

  onClick = (): void => {
    if (this.state.isFormOpened) {
      if (!this.state.title) {
        alert('Название чата обязательно');
        return;
      }
      this.onSubmit();
    }
    this.setState({
      isFormOpened: !this.state.isFormOpened,
    });
  };

  render(): [string, StateType?] {
    return [
      `
      <div class="create-chat-form">
        {% if state.isFormOpened %}
          <div class="create-chat-form-field">
            <InputField
              name="title"
              id="title"
              value="{{state.title}}"
              type="text"
              title="Название чата"
              onFieldChange={{onChange}}
            />
          </div>
        {% endif %}
        <button class="create-chat-button" onClick={{onClick}}>Создать чат</button>
      </div>
    `,
      { onClick: this.onClick, onChange: this.onChange },
    ];
  }
}
