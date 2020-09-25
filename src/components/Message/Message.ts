import { Component } from '../../core/Component.js';

export class Message extends Component {
  render(): [string] {
    return [
      `
            <div 
                {% if !props.isMy %}
                    class="message"
                {% else %}
                class="message message--me"
                {% endif %}
            >
                <article class="message__content">
                <p>{{props.message}}</p>
                <p />
                </article>
                <div class="message__status">
                    <time class="message__time">
                    {{props.time}}
                    </time>
                    {% if props.isMy %}
                        <div class="message__indicator">
                            <img src="/img/icons/check.svg" alt="check" />
                        </div>
                    {% endif %}
                    </div>
            </div>
        `,
    ];
  }
}

if (typeof templator !== 'undefined') {
  templator.registry.register('Message', Message);
}
