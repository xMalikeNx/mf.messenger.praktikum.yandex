export function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}
