import { Component } from '../../core/Component';
import { Router } from '../../core/Router/Router';
import { StateType } from '../../core/types';

import './leftPanelMenu.scss';

export class LeftPanelMenu extends Component {
  private router: Router;

  constructor() {
    super();

    this.state = {
      links: [
        { title: 'Профиль', link: '/profile' },
        { title: 'Логин', link: '/login' },
        { title: 'Регистрация', link: '/registration' },
      ],
    };

    this.router = Router.getInstance();
    this.router.subscribe(this);
  }

  render(): [string, StateType?] {
    return [
      `
      <div class="left-panel-menu opened">
        <div class="left-panel-menu__logo">
          MNMessager
        </div>
        <nav class="left-panel-menu-list">
          {% for link in state.links %}
            <Link link={{link.link}} text={{link.title}}
              {% if props.router.pathname === link.link %}
                className="left-panel-menu-list__item current"
              {% else %}
                className="left-panel-menu-list__item"
              {% endif %}
            />
          {% endfor %}
        </nav>
      </div>
      `,
    ];
  }
}
