type SerializablePrimitive = string | number | boolean | null;
type SerializableArray = Serializable[];

type SerializableRecord = {
  [key: string]: Serializable;
};

type Serializable =
  | SerializablePrimitive
  | SerializableArray
  | SerializableRecord;

export type {
  Serializable,
  SerializableArray,
  SerializablePrimitive,
  SerializableRecord,
};
