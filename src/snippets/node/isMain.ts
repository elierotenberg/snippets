import { createRequire } from "node:module";
import { extname } from "node:path";
import { fileURLToPath } from "node:url";

export const isMain = (meta: ImportMeta): boolean => {
  const argv1 = process.argv[1];
  if (!meta || !argv1) {
    return false;
  }
  const require = createRequire(meta.url);
  const scriptPath = require.resolve(argv1);
  const modulePath = fileURLToPath(meta.url);

  const scriptExtension = extname(scriptPath);
  if (typeof scriptExtension === `string`) {
    return modulePath === scriptPath;
  }

  const moduleExtension = extname(modulePath);
  if (typeof moduleExtension !== `string`) {
    return modulePath === scriptPath;
  }

  return modulePath === scriptPath.slice(0, -moduleExtension.length);
};
