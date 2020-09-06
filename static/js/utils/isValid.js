export function isValid(value, checkEmpty = true) {
  // пока что добавил валидацию только по символам, которые могут сломать мой велосипед)
  // в ходе развития приложения буду добавлять еще
  if (value.match(/["<>\/]/g)) {
    return false;
  }

  if (checkEmpty && !value.replace(/' '/g, '')) {
    return false;
  }

  return true;
}
