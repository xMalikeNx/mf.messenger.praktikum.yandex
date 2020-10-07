import { Component } from '../../core/Component';
import { Router } from '../../core/Router/Router';
import { StateType } from '../../core/types';

export class Link extends Component {
  private _router: Router;

  constructor(props: StateType, parent?: Component) {
    super(props, parent);

    this.props = {
      link: this.props.link || '/chat',
      text: this.props.text || '',
      className: this.props.className || '',
    };

    this._router = Router.getInstance();
    this._router.subscribe(this);
  }

  componentWillUnmount(): void {
    this._router.unsubscribe(this);
  }

  onChangeRoute(): void {
    const { link } = this.props;
    if (typeof link === 'string') {
      this._router.go(link);
    }
  }

  render(): [string, StateType?] {
    const className = `btn-link ${this.props.className ?? ''}`;

    return [
      `
      <button class={{className}} onClick={{onChangeRoute}}>
        {{props.text}}
      </button>
      `,
      { onChangeRoute: this.onChangeRoute.bind(this), className },
    ];
  }
}
