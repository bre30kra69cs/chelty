type NullableValue = undefined | null;

type Nullable<T = void> = T | NullableValue;

type Dict<T = unknown> = Record<string, T>;
