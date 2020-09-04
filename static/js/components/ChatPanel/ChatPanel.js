export function ChatPanel() {
  this.render = function () {
    return `
      {% if !selectedChat %}
        <main class="chat-panel chat-panel--empty" >
      {% else %}
        <main class="chat-panel">
      {% endif %}
        {% if !selectedChat %}
          Выберите чат чтобы отправить сообщение
        {% else %}
          <TopBar />
          <Chat />
          <MessageBar />
        {% endif %}
      </main>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(ChatPanel);
}
