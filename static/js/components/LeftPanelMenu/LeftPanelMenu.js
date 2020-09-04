export function LeftPanelMenu({ appName, options, menuOpened, selectedOption }) {
  this.ctx = {
    appName,
  };

  this.render = function () {
    console.log(options);
    return `
        {% if menuOpened %}
          <div class="left-panel-menu opened">
        {% else %}
          <div class="left-panel-menu">
        {% endif %}
        <div class="left-panel-menu__logo">
          {{ appName }}
        </div>
        <nav class="left-panel-menu-list">
          {% for option in options %}
              <a href={{option.link}}
            {% if option.link === selectedOption %}
              class="left-panel-menu-list__item current">
            {% else %}
              class="left-panel-menu-list__item">
            {% endif %}

              {{option.title}}
            
            </a>
          {% endfor %}
        </nav>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(LeftPanelMenu);
}
