export const isNonNullable = <T>(value: T): value is NonNullable<T> =>
  typeof value !== `undefined` && value != null;
