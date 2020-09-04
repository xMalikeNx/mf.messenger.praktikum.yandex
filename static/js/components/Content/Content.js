export function Content({ selectedChat, selectedOption }) {
  this.render = function () {
    return `
      <div>
        {% if !selectedOption %}
          <ChatPanel selectedChat={{selectedChat}} />
        {% elif selectedOption === 'profile' %}
          <Profile />
        {% endif %}
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(Content);
}
