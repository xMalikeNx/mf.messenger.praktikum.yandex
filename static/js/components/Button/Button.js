export function Button({
  buttonName,
  onClick,
  type = 'button',
  className = '',
  form = '',
}) {
  this.ctx = {
    buttonName,
    className: `button ${className}`,
    onClick,
    type,
    form,
  };

  this.render = function () {
    return `
      <button 
        class={{className}}
        {% if form %}
        form={{form}} 
        {% endif %}
        onClick={{onClick}} type={{type}}></button>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(Button);
}
