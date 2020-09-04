export function MessageItem({isMy, message, time}) {

  this.render = function() {
    return `
      {% if isMy %}
        <div class="message message--me">
      {% else %}
        <div class="message">
      {% endif %}
        <article class="message__content">
          <p>{{message}}</p>
        </article>
        <div class="message__status">
          <time class="message__time">
            {{time}}
          </time>
        </div>
      </div>
    `
  }
}

if (window.tpls) {
  window.tpls.register(MessageItem);
}