type PrefixObjectKeys<T extends Record<string, any>, Prefix extends string> = {
  [K in keyof T as `${Prefix}${Capitalize<string & K>}`]: T[K];
};

export default PrefixObjectKeys;
