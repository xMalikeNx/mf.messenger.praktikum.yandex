export function LoadingIndicator() {
  this.render = function () {
    return `
      <div class="loading-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(LoadingIndicator);
}
