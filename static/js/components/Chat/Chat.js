export function Chat({ selectedChat }) {
  setTimeout(async () => {
    const messages = await window.api.fetchDialogMessages(selectedChat);
    this.ctx.messages = messages;
    this.tick();
  });

  this.ctx = {
    messages: [],
  };

  this.render = function () {
    return `
      <div class="chat">
        <time class="message-time">
          29 августа
        </time>
        {% for message in messages %}
          <MessageItem
            message={{message.message}}
            time={{message.time}}
            isMy={{message.isMy}}
          />
        {% endfor %}
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(Chat);
}
