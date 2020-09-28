import { Component } from '../../core/Component';
import { Router } from '../../core/Router/Router';
import { StateType } from '../../core/types';
import { DialogsListStore } from '../../stores/dialogs.store';

export class App extends Component {
  dialogsStore: DialogsListStore;
  private router: Router;
  private _availableRoutes = [
    '/chat',
    '/profile',
    '/menu',
    '/login',
    '/registration',
  ];

  constructor() {
    super();
    this.router = Router.getInstance();
    this.router.subscribe(this);
    this.router.go(
      window.location.pathname === '/' ? '/chat' : window.location.pathname
    );
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
  }

  componentDidMount() {
    document.title = 'MNMessager';
    this.dialogsStore.startLoadItems();
  }

  componentWillUnmount() {
    this.router.unsubscribe(this);
  }

  render(): [string, StateType?] {
    const { pathname } = this._props.router as StateType;
    return [
      `
      <div class="app">
          {% if pathname === "/chat" || pathname === "/profile" || pathname === "/menu" %}
              <LeftPanel />
              {% if pathname === "/profile" %}
                  <Profile />
              {% elif pathname === "/chat" || pathname === "/menu" %}
                  <DialogsList />
                  {% if props.dialogs.selectedDialogId === null %}
                    <div class="chat-panel chat-panel--empty">
                      Выберите чат чтобы отправить сообщение
                    </div>
                  {% else %}
                    <ChatPanel selectedChatId={{props.dialogs.selectedDialogId}} />
                  {% endif %}
              {% endif %}
          {% endif %}
          {% if pathname === "/login" %}
              <Login />
          {% elif pathname === "/registration" %}
              <Registration />
          {% endif %}
          {% if !routes.includes(pathname) %}
            <ErrorPage code="404" title="Страница не найдена" />
          {% endif %}
        </div>
      `,
      { pathname, routes: this._availableRoutes },
    ];
  }
}
