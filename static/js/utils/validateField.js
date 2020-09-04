export function validateField(value) {
  if (value.match(/"/g)) {
    return false;
  }

  return true;
}
