import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = (meta: ImportMeta): string => {
  const path = fileURLToPath(meta.url);
  return dirname(path);
};

export { __dirname };
