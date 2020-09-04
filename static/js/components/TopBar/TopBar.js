export function TopBar() {
  this.render = function() {
    return `
      <header class="top-bar">
        <button class="back-button">
          <img
            class="back-button__icon"
            src="/img/icons/back.svg"
            alt="back"
          />
        </button>
        <div class="top-bar-info">
          <div class="avatar">
            М
          </div>
          <div class="top-bar-info__data">
            <div class="top-bar-info__username">
              Мур
            </div>
            <time class="top-bar-info__lastvisit">
              был в сети 20 минут назад
            </time>
          </div>
        </div>
        <div class="settings-wrap">
          <div class="dots-icon">
            <img
              class="dots-icon__img"
              src="/img/icons/dots.svg"
              alt="dots"
            />
          </div>
        </div>
      </header>
    `
  }
}

if (window.tpls) {
  window.tpls.register(TopBar);
}