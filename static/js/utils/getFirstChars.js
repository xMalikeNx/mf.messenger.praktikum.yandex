export function getFirstChars(userName) {
  if (!userName || typeof userName !== 'string') {
    return userName;
  }
  return userName
    .split(' ')
    .reduce((result, current) => result + current[0], '');
}
