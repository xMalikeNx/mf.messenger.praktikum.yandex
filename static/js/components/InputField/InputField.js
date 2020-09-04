export function InputField({
  name,
  type = 'text',
  options,
  onChange,
  value = '',
  placeholder = '',
  label = '',
  className = '',
}) {
  this.ctx = {
    name,
    type,
    options,
    onInputChange: function (e) {
      console.log(e);
      if (typeof onChange === 'function') {
        onChange(e);
      }
    },
    value,
    placeholder,
    label,
    className,
  };
  this.render = function () {
    console.log(this.ctx);
    console.log(this.props);
    return `
      {% if className %}
        <div class="input-field {{className}}">
      {% else %}
        <div class="input-field">
      {% endif %}
        {% if label %}
          <label for={{name}} class="input-field__label">
            {{label}}
          </label>
        {% endif %}
        {% if type === 'select' %}
          <select name="name" onChange={{onInputChange}} id={{name}}>
          {% for option in options %}
            <option value={{option.value}}>
              {{option.title}}
            </option>
          {% endfor %}
          </select>
        {% else %}
          <input class="input-field__field"
           placeholder={{placeholder}}
           type={{type}}
           onChange={{onInputChange}}
           name={{name}}
           id={{name}} 
            value={{value}}
           />
        {% endif %}
      </div>
    `;
  };
}

if (window.tpls) {
  window.tpls.register(InputField);
}
