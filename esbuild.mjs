#!/usr/bin/env node

import { build } from "esbuild";

// eslint-disable-next-line no-restricted-imports
import { base, esmFormat, nodePlatform } from "./esbuild.config.base.mjs";

await build({
  ...base,
  ...esmFormat,
  ...nodePlatform,
  bundle: true,
  entryPoints: [`src/main.ts`],
  outfile: `build/main.mjs`,
});
