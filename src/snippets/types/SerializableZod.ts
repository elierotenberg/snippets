import { z } from "zod";

import type { ZodType } from "zod";
type SerializablePrimitive = string | number | boolean | null;
type SerializableArray = Serializable[];

type SerializableRecord = {
  [key: string]: Serializable;
};

type Serializable =
  | SerializablePrimitive
  | SerializableArray
  | SerializableRecord;

const SerializablePrimitive: ZodType<SerializablePrimitive> = z
  .union([z.string(), z.number(), z.boolean()])
  .describe(`NonNullableSerializablePrimitive`);

const SerializableArray: ZodType<SerializableArray> = z.lazy(() =>
  z.array(Serializable),
);

const SerializableRecord: ZodType<SerializableRecord> = z.lazy(() =>
  z.record(Serializable),
);

const Serializable: ZodType<Serializable> = z.lazy(() =>
  z.union([SerializablePrimitive, SerializableArray, SerializableRecord]),
);

export {
  Serializable,
  SerializableArray,
  SerializablePrimitive,
  SerializableRecord,
};
