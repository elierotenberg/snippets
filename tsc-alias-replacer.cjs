/**
 * @type {import('tsc-alias').AliasReplacer} context
 */
const replacer = ({ file, orig }) => {
  const requireRegExp = /require\("(\.[^"]+)"\)/g;
  if (file.endsWith(`.cjs`)) {
    return orig.replace(requireRegExp, `require("$1.cjs")`);
  }
  const fromRegExp = /from "(\.[^"]+)"/g;
  if (file.endsWith(`.mjs`)) {
    return orig.replace(fromRegExp, `from "$1.mjs"`);
  }
  return orig;
};

exports.default = replacer;
