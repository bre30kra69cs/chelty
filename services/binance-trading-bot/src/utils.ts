export const uniq = <T extends unknown>(args: T[]): T[] => {
  return Array.from(new Set(args));
};

export const isNullable = <T>(value?: Nullable<T>): value is NullableValue => {
  return value === undefined || value === null;
};

export const isObject = <T>(value?: Nullable<T>) => {
  return !isNullable(value) && typeof value === 'object';
};

export const isObjectGuard = <T extends object>(value?: Nullable<T>): value is T => {
  return isObject(value);
};

export const isArray = <T>(value?: Nullable<T>) => {
  return Array.isArray(value);
};

export const isArrayGuard = <T extends unknown[]>(value?: Nullable<T>): value is T => {
  return isArray(value);
};

export const isDict = <T>(value?: Nullable<T>) => {
  return isObject(value) && !Array.isArray(value);
};

export const isDictGuard = <T extends Dict>(value?: Nullable<T>): value is T => {
  return isDict(value);
};
