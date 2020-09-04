export function Avatar({ background = '#b98eff', className = '' }) {
  this.ctx = {
    background,
    selfClassName: `avatar ${className}`,
  };
  // в компонент можно передать childrens при записи <Avata>Что угодно</Avatar>, но тут это не отображается явно
  this.render = function () {
    console.log('avatar rendered');
    return `
      <div class={{selfClassName}} style="background: {{background}};">
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(Avatar);
}
