type Dict<K extends string = string, T = unknown> = Record<K, T>;

const createDict = <K extends string = string, T = unknown>(): Dict<K, T> =>
  Object.create(null) as Dict<K, T>;

const isDict = (value: unknown): value is Dict =>
  typeof value === `object` && value != null;

export { createDict, isDict };
export type { Dict };
