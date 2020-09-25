export type ValidationTypes = 'email' | 'text' | 'hex';

export const validate = (inp: string, type: ValidationTypes = 'text') => {
  if (!inp.length) {
    return false;
  }

  if (type === 'text') {
    if (!inp.match(/^[a-zA-Z0-9-_]+/)) {
      return false;
    }
  }

  if (type === 'email') {
    if (!inp.match(/^[0-9a-zA-Z]+@[a-zA-Z].[a-zA-Z]/)) {
      return false;
    }
  }

  if (type === 'hex') {
    if (!inp.match(/^#[0-9A-Fa-f]{6}&/) && !inp.match(/^#[0-9A-Fa-f]{6}&/)) {
      return false;
    }
  }

  return true;
};
