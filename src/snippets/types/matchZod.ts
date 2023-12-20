import type { z } from "zod";

const matchZod = <T>(value: unknown, Z: z.ZodType<T>): value is T =>
  Z.safeParse(value).success;

export { matchZod };
