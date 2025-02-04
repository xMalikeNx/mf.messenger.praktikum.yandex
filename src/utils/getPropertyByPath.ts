import { Indexed } from '../types';

export function getPropertyByPath(obj: Indexed, path: string): unknown {
  if (!path) {
    return obj;
  }

  let current = obj;
  for (const part of path.split('.')) {
    current = current[part] as Indexed;
    if (!current) {
      return undefined;
    }
  }

  return current;
}
