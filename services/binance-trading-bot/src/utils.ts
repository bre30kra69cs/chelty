export const uniq = <T extends unknown>(args: T[]): T[] => {
  return Array.from(new Set(args));
};

export const isNullable = <T>(value?: Nullable<T>): value is NullableValue => {
  return value === undefined || value === null;
};

export const isObject = <T extends object>(value?: Nullable<T>): value is T => {
  return !isNullable(value) && typeof value === 'object';
};

export const isArray = <T extends unknown[]>(value?: Nullable<T>): value is T => {
  return Array.isArray(value);
};

export const isDict = <T extends Dict>(value?: Nullable<T>): value is T => {
  return isObject(value) && !Array.isArray(value);
};
