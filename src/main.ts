#!/usr/bin/env node

import { copyFile, constants as fsConstants, readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { glob } from "glob";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { z } from "zod";

import { __dirname } from "@/snippets/node/__dirname";
import { isMain } from "@/snippets/node/isMain";
import { runAsMain } from "@/snippets/node/runAsMain";

const PackageJson = z.object({
  files: z.array(z.string()),
});

runAsMain(import.meta, isMain, async () => {
  const root = resolve(__dirname(import.meta), `..`);
  const listFiles = async (cwd: string): Promise<string[]> => {
    const filePatterns = PackageJson.parse(
      JSON.parse(
        await readFile(resolve(root, `package.json`), { encoding: `utf-8` }),
      ),
    ).files.filter(
      (file) => !file.startsWith(`build`) && !file.startsWith(`./build`),
    );
    const files = await glob(filePatterns, { cwd, nodir: true });
    return files;
  };

  await yargs(hideBin(process.argv))
    .command(`list`, `List available snippets`, async () => {
      const files = await listFiles(root);
      console.log(files.join(`\n`));
    })
    .command(
      `import`,
      `Import snippet into your project`,
      {
        cwd: {
          alias: `c`,
          default: process.cwd(),
          type: `string`,
        },
        dest: {
          alias: `d`,
          demandOption: true,
          type: `string`,
        },
        force: {
          alias: `f`,
          default: false,
          type: `boolean`,
        },
        snippet: {
          alias: `s`,
          demandOption: true,
          type: `string`,
        },
      },
      async ({ cwd, dest, force, snippet }) => {
        const files = await listFiles(root);
        const file = files.find((file) => file === snippet);
        if (!file) {
          throw new Error(`Snippet ${snippet} not found`);
        }
        const src = resolve(root, file);
        await copyFile(
          src,
          resolve(cwd, dest),
          force ? 0 : fsConstants.COPYFILE_EXCL,
        );
      },
    )
    .demandCommand()
    .strict()
    .help().argv;
});
