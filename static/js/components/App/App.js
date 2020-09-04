export function App() {
  this.onSelectChat = (chatId) => {
    const dialogsPanel = this.findChild('DialogsPanel');
    const chatPanel = this.findChild('Content');

    this.ctx.selectedChat = chatId;
    dialogsPanel.tick(this.ctx);
    chatPanel.tick(this.ctx);
  };

  this.onSelectOption = (option) => {
    const leftPanel = this.findChild('LeftPanel');
    this.ctx.selectedOption = option;
    leftPanel.tick(this.ctx);
  };

  this.onSelectLink = (link) => {
    const leftPanel = this.findChild('LeftPanel');
    const content = this.findChild('Content');

    this.ctx.selectedLink = link;
    if (link === 'bars') {
      this.ctx.menuOpened = true;
      this.ctx.selectedOption = this.ctx.options[0].link;
      content.tick(this.ctx);
    } else {
      this.ctx.menuOpened = false;
      this.ctx.selectedOption = null;
      content.tick(this.ctx);
    }
    leftPanel.tick(this.ctx);
  };

  this.render = function () {
    this.ctx = {
      onSelectChat: this.onSelectChat,
      onSelectLink: this.onSelectLink,
      onSelectOption: this.onSelectOption,
      selectedChat: null,
      selectedLink: 'chat',
      selectedOption: null,
      links: [
        { link: 'bars', icon: 'fa fa-bars' },
        { link: 'chat', icon: 'fa fa-comments' },
      ],
      options: [{ title: 'Профиль', link: 'profile' }],
      menuOpened: false,
    };

    return `
      <div class="app">
        <LeftPanel 
          links={{links}}
          options={{options}}
          selectedOption={{selectedOption}}
          selectedLink={{selectedLink}}
          onSelectLink={{onSelectLink}}
          onSelectOption={{onSelectOption}}
          menuOpened={{menuOpened}}
          />
        <DialogsPanel selectedChat={{selectedChat}} onSelectChat={{onSelectChat}} />
        <Content selectedOption={{selectedOption}} />
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(App);
}
