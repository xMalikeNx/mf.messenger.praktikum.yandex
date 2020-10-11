import { Component } from '../../core/Component';
import { Router, TRouter } from '../../core/Router/Router';
import { StateType } from '../../core/types';
import { AuthStore, TAuthStore } from '../../stores/auth.store';
import { DialogsListStore } from '../../stores/dialogs.store';
import { UiStore } from '../../stores/ui.store';

type TAppProps = {
  auth: TAuthStore;
  router: TRouter;
};

export class App extends Component<any, TAppProps> {
  dialogsStore: DialogsListStore;
  uiStore: UiStore;
  authStore: AuthStore;

  private router: Router;
  private _availableRoutes = [
    '/chat',
    '/profile',
    '/menu',
    '/login',
    '/registration',
  ];

  constructor(props: TAppProps, parent?: Component) {
    super(props, parent);
    this.router = Router.getInstance();
    this.router.subscribe(this);
    this.router.go(
      window.location.pathname === '/' ? '/chat' : window.location.pathname
    );

    // init stores
    this.dialogsStore = DialogsListStore.getInstance() as DialogsListStore;
    this.dialogsStore.subscribe(this);
    this.uiStore = UiStore.getInstance() as UiStore;
    this.uiStore.subscribe(this);
    this.authStore = AuthStore.getInstance() as AuthStore;
    this.authStore.subscribe(this);
  }

  componentDidMount(): void {
    document.title = 'MNMessager';
    this.initAuth();
  }

  async initAuth(): Promise<void> {
    await this.authStore.getUserInfo();
    if (
      !this.props.auth.isLoggedIn &&
      this.props.router.pathname !== '/registration'
    ) {
      this.router.go('/login');
    }
  }

  componentWillUnmount(): void {
    this.uiStore.unsubscribe(this);
    this.authStore.unsubscribe(this);
    this.router.unsubscribe(this);
  }

  render(): [string, StateType?] {
    const { pathname } = this.props.router;
    return [
      `
      <div class="app">
          {% if props.ui.notification.opened %}
            <Notification />
          {% endif %}
          {% if props.ui.modals.chatUsersList.opened %}
            <ChatUsersListModal />
          {% endif %}
          {% if props.ui.modals.inviteUsersList.opened %}
            <UsersListModal />
          {% endif %}
          {% if props.auth.isLoggedIn %}
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
