export const parseJSON = <T = any>(json: string): T => {
  return JSON.parse(json) as T;
};
