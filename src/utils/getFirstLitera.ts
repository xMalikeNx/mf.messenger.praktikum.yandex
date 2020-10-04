export const getFirstLitera = (word: string): string => {
  return word
    .split(' ')
    .reduce((res: string, current) => (res + current.slice(0, 1)), '');
};
