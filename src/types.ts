export type Indexed = {
  [key: string]: any;
};

export type TUserDto = {
  id: number;
  display_name: string | null;
  avatar: string | null;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TUserInfo = {
  id?: number;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
