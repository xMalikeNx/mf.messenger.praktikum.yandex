import { Component } from '../../core/Component';
import { Router } from '../../core/Router/Router';
import { StateType } from '../../core/types';

import './leftPanel.scss';

export class LeftPanel extends Component {
  private router: Router;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.state = {
      items: [
        {
          link: '/menu',
          icon: 'fa fa-bars',
        },
        {
          link: '/chat',
          icon: 'fa fa-comment',
        },
      ],
    };

    this.router = Router.getInstance();
    this.router.subscribe(this);
  }

  onClick = (tag: string) => (): void => {
    const { onClick } = this.props;

    if (typeof onClick === 'function') {
      onClick(tag);
    }
  };

  componentWillUnmount(): void {
    this.router.unsubscribe(this);
  }

  render(): [string, StateType?] {
    return [
      `
      <aside class="left-panel">
        <nav class="left-panel-navs">
          {% for item in state.items %}
            <Link
              link={{item.link}}
              {% if props.router.pathname === item.link %}
                  class="left-panel-navs__item current"
              {% else %}
                  class="left-panel-navs__item"
              {% endif %}
            >
              <i class={{item.icon}} />
            </Link>
          {% endfor %}
        </nav>
        {% if props.router.pathname === "/menu" || props.router.pathname === "/profile" %}
          <LeftPanelMenu />
        {% endif %}
      </aside>
      `,
    ];
  }
}
