type ParsedType<T> = {
  isOk: boolean;
  result?: T;
};

export const parseJSON = <T = any>(str: string): ParsedType<T> => {
  try {
    return {
      isOk: true,
      result: JSON.parse(str),
    };
  } catch (err) {
    return {
      isOk: false,
    };
  }
};
