export function LeftPanel({
  options,
  selectedOption,
  links,
  selectedLink,
  menuOpened,
  onSelectLink,
}) {
  this.onClick = (e) => {
    const link =
      e.target.dataset.link || e.target.closest('[data-link]').dataset.link;

    onSelectLink(link);
  };

  this.ctx = {
    onClick: this.onClick,
  };

  this.render = function () {
    return `
      <aside class="left-panel">
        <nav class="left-panel-navs">
          {% for link in links %}
            {% if link.link === selectedLink %}
              <button data-link={{link.link}} class="left-panel-navs__item current">
                <i class={{link.icon}} />
              </button>
            {% else %}
              <button data-link={{link.link}} onClick={{onClick}} class="left-panel-navs__item">
                <i class={{link.icon}} />
              </button>
            {% endif %}
          {% endfor %}
        </nav>
        <LeftPanelMenu menuOpened={{menuOpened}} selectedOption={{selectedOption}} options={{options}} appName="MNMessager" />
      </aside>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(LeftPanel);
}
