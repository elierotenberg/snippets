const ESLINT_CI = Boolean(process.env.ESLINT_CI);

/**
 * @param {unknown} ciRule
 * @param {unknown} defaultRule
 *
 */
const ciRule = (ciRule, defaultRule) => (ESLINT_CI ? ciRule : defaultRule);

module.exports = {
  extends: [
    `plugin:@typescript-eslint/recommended`,
    `plugin:@typescript-eslint/recommended-requiring-type-checking`,
    `plugin:@typescript-eslint/strict`,
    `plugin:prettier/recommended`,
    `plugin:import/errors`,
    `plugin:import/warnings`,
    `plugin:import/typescript`,
    `prettier`,
  ],
  overrides: [
    {
      files: [`*.cjs`],
      rules: {
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-var-requires": 0,
      },
    },
  ],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    ecmaVersion: 2018,
    project: `./tsconfig.eslint.json`,
    sourceType: `module`,
  },
  plugins: [
    `@typescript-eslint/eslint-plugin`,
    `eslint-plugin-import`,
    `eslint-plugin-prettier`,
    `sort-keys-fix`,
    `sort-destructure-keys`,
    `sort-exports`,
  ],
  root: true,
  rules: {
    "@typescript-eslint/consistent-type-definitions": [1, `type`],
    "@typescript-eslint/consistent-type-exports": 1,
    "@typescript-eslint/consistent-type-imports": [
      1,
      {
        fixStyle: `separate-type-imports`,
        prefer: `type-imports`,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/naming-convention": [
      `error`,
      {
        format: [`strictCamelCase`, `UPPER_CASE`, `PascalCase`, `snake_case`],
        leadingUnderscore: `allow`,
        selector: `variableLike`,
      },
    ],
    "@typescript-eslint/no-misused-promises": ciRule(1, 0),
    "@typescript-eslint/no-unsafe-argument": ciRule(1, 0),
    "@typescript-eslint/no-unsafe-assignment": ciRule(1, 0),
    "@typescript-eslint/no-unsafe-return": ciRule(1, 0),
    "@typescript-eslint/no-unused-vars": [1, { argsIgnorePattern: `^_` }],
    "@typescript-eslint/switch-exhaustiveness-check": `error`,
    "import/consistent-type-specifier-style": [1, `prefer-top-level`],
    "import/namespace": ciRule(1, 0),
    "import/no-cycle": ciRule(1, 0),
    "import/no-relative-packages": 1,
    "import/order": [
      1,
      {
        "alphabetize": {
          caseInsensitive: true,
          order: `asc`,
          orderImportKind: `asc`,
        },
        "groups": [
          `builtin`,
          `external`,
          `internal`,
          `parent`,
          `sibling`,
          `index`,
          `object`,
          `type`,
        ],
        "newlines-between": `always`,
      },
    ],
    "no-restricted-imports": [
      1,
      {
        patterns: [
          {
            group: [`./*`, `../*`],
            message: `Use @ imports instead`,
          },
          {
            group: [`@/index`],
            message: `Use specific imports instead`,
          },
        ],
      },
    ],
    "no-useless-rename": [1],
    "object-shorthand": [1, `always`],
    "prettier/prettier": [
      1,
      { endOfLine: `auto`, quoteProps: `consistent`, trailingComma: `all` },
    ],
    "quotes": [1, `backtick`],
    "sort-destructure-keys/sort-destructure-keys": 1,
    "sort-exports/sort-exports": [
      1,
      {
        sortExportKindFirst: `value`,
      },
    ],
    "sort-imports": [1, { ignoreDeclarationSort: true }],
    "sort-keys-fix/sort-keys-fix": [1, `asc`, { natural: true }],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [`.ts`, `.d.ts`],
    },
    "import/resolver": {
      node: true,
      typescript: true,
    },
  },
};
