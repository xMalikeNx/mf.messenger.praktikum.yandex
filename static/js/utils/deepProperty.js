export function deepProperty(path, obj) {
  let current = obj;

  for (part in path.split('.')) {
    current = current[part];

    if (!current) {
      return current;
    }
  }

  return current;
}
