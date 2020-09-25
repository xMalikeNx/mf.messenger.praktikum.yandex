export const parseQueryParams = (input: { [key: string]: unknown }) => {
  return Object.keys(input).reduce((res: string, key: string, idx: number) => {
    let prefix = '&';
    if (idx === 0) {
      prefix = '?';
    }
    return `${res}${prefix}${key}=${JSON.stringify(input[key])}`;
  }, '');
};
