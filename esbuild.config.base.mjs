/**
 * @type {import("esbuild").BuildOptions}
 */
const base = {
  outbase: `src`,
  sourcemap: true,
};

/**
 * @type {import("esbuild").BuildOptions}
 */
const cjsFormat = {
  format: `cjs`,
  outExtension: {
    ".js": `.cjs`,
  },
  resolveExtensions: [`.cjs`, `.js`, `.json`, `.cts`, `.ts`],
};

/**
 * @type {import("esbuild").BuildOptions}
 */
const esmFormat = {
  format: `esm`,
  outExtension: {
    ".js": `.mjs`,
  },
  resolveExtensions: [`.mjs`, `.js`, `.json`, `.cts`, `.ts`],
};

/**
 * @type {import("esbuild").BuildOptions}
 */
const nodePlatform = {
  minify: false,
  packages: `external`,
  platform: `node`,
};

/**
 * @type {import("esbuild").BuildOptions}
 */
const browserPlatform = {
  minify: true,
  platform: `browser`,
};

export { base, browserPlatform, cjsFormat, esmFormat, nodePlatform };
