import { Component } from '../../core/Component';
import { Router } from '../../core/Router/Router';
import { StateType } from '../../core/types';

export class Link extends Component {
  private _router: Router;

  constructor(props: StateType) {
    super(props);

    this.props = {
      link: this.props.link || '/chat',
      text: this.props.text || '',
      className: this.props.className || '',
    };

    const router = Router.getInstance();
    this._router = router;
    this._router.subscribe(this);
  }

  onChangeRoute() {
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

if (typeof templator !== 'undefined') {
  templator.registry.register('Link', Link);
}
