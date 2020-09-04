export function ErrorIndicator({ code, title }) {
  this.ctx = {
    code: code || 404,
    title: title || 'Страница не найдена',
  };
  this.render = function () {
    return `
      <div class="app gradient-page">
          <div class="error-panel">
            <div class="error-panel__code">{{code}}</div>
            <div class="error-panel__message">{{title}}</div>
          </div>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(ErrorIndicator);
}
