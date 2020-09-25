type ParsedType = {
  isOk: boolean;
  result?: any;
};

export const parseJSON = (str: string): ParsedType => {
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
