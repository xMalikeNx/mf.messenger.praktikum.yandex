import { ucFirst } from './ucFirst.js';

export function getFirstChars(userName) {
  if (!userName) {
    return userName;
  }
  return userName.split(' ').reduce((result, current) => {
    return result + ucFirst(current)[0];
  }, '');
}
