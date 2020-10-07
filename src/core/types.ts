type Indexed = {
  [name: string]: unknown;
};

export type StateType<T = Indexed> = T;
