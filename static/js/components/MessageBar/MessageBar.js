export function MessageBar() {
  this.ctx = {
    message: '',
  }
  this.render = function () {
    return `
      <footer class="message-bar">
        <div class="message-bar__attach">
          <img src="/img/icons/attach.svg" alt="attach" />
        </div>
        <div class="message-bar__input-wrap">
          <input
            class="message-bar__input"
            placeholder="Сообщение"
            type="text"
          />
          <div class="message-bar__send">
            <img src="/img/icons/send.svg" alt="send" />
          </div>
        </div>
      </footer>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(MessageBar);
}
