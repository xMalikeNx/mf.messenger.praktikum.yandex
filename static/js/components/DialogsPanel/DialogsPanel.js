export function DialogsPanel({ onSelectChat, selectedChat }) {
  this.fetchDialogs = async () => {
    const dialogs = await window.api.fetchDialogs();
    this.ctx.dialogs = dialogs;
    this.ctx.isLoading = false;
    setTimeout(() => this.tick(), 0);
  };

  this.ctx = {
    selectedChat,
    onSelectChat,
    dialogs: [],
    isLoading: true,
  };

  this.fetchDialogs();
  this.render = function () {
    return `
      <aside class="dialogs-panel">
        <div class="search-input-wrapper">
          <button class="bars-button">
            <i class="bars-button__icon fa fa-bars"></i>
          </button>
          <InputField className="search-input" placeholder="Поиск" type="text" name="search" />  
        </div>
        {% if dialogs && !isLoading %}
          <ul class="dialogs__list">
            {% for dialog in dialogs  %}
              <DialogItem
                onClick={{onSelectChat}}
                {% if selectedChat === dialog.id %}
                  selected="true"
                {% else %}
                  selected="false"
                {% endif %}
                id={{dialog.id}}
                lastMessage={{dialog.lastMessage}}
                time={{dialog.time}}
                isMy={{dialog.isMy}}
                checked={{dialog.checked}}
                unreadCount={{dialog.unreadCount}}
                userName={{dialog.userName}}
                background={{dialog.background}}
              />
            {% endfor %}
          </ul>
        {% else %}
          <LoadingIndicator />
        {% endif %}
      </aside>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(DialogsPanel);
}
