import * as babel from "@babel/core";
import babelPluginSyntaxJSX from "@babel/plugin-syntax-jsx";
import babelPresetTypeScript from "@babel/preset-typescript";
import babelPluginReplaceTsExports from "babel-plugin-replace-ts-export-assignment";
import glob from "fast-glob";
import fs from "fs-extra";
import { exec } from "node:child_process";
import path from "node:path";
import { cwd } from "node:process";
import util from "node:util";
import prettier from "prettier";

const appPath = path.join(cwd(), "/app");
const studioPath = path.join(cwd(), "/studio");

const execPromise = util.promisify(exec);

/** TypeScript removal by Remix (https://github.com/remix-run/remix/blob/43c2f09161a6bb02bee3522e10f3a445320d38b0/packages/remix-dev/cli/useJavascript.ts#L1) */
export let stripTypeScript = async (projectDir) => {
  console.log("Removing TypeScript from", projectDir);

  let entries = await glob("**/*.+(ts|tsx)", {
    absolute: true,
    cwd: projectDir,
  });
  for (let entry of entries) {
    if (entry.endsWith(".d.ts")) {
      fs.rmSync(entry);
      continue;
    }
    let tsx = await fs.readFile(entry, "utf8");
    let mjs = transpile(tsx, {
      filename: path.basename(entry),
      cwd: projectDir,
    });
    fs.rmSync(entry);
    await fs.writeFile(
      entry.replace(/\.ts$/, ".js").replace(/\.tsx$/, ".jsx"),
      mjs,
      "utf8"
    );
  }

  // remove packages
  await execPromise(
    "npm uninstall typescript @types/node @types/react @types/react-dom @sanity/types @portabletext/types ",
    {
      cwd: projectDir,
    }
  );

  // remove tsconfig file
  fs.rmSync(path.join(projectDir, "tsconfig.json"));

  // recursively loop through src folder to find all svelte file paths
  const svelteFilePaths = [];

  async function scanFolderForSvelteFiles(folder) {
    const files = await fs
      .readdir(path.resolve(folder), {
        withFileTypes: true,
      })
      .catch((err) => {});

    if (files) {
      for (const file of files) {
        if (file.isFile() && file.name.endsWith(".svelte")) {
          svelteFilePaths.push(path.resolve(folder, file.name));
          continue;
        }

        if (file.isDirectory()) {
          await scanFolderForSvelteFiles(path.resolve(folder, file.name));
        }
      }
    }
  }

  await scanFolderForSvelteFiles(path.resolve(projectDir, "src"));

  for (const svelteFilePath of svelteFilePaths) {
    const file = await fs.readFile(svelteFilePath, {
      encoding: "utf8",
    });

    // remove typescript
    const newSvelteFile = file
      .replace(/^\s*interface\s+\w+\s*\{\s*[\s\S]*?\s*\}\s*$/gm, "")
      .replace(/^type\s+.*?;\s*$/gm, "")
      .replace(/:\s*PageData/gm, "")
      .replace(
        /^.*import\s+type\s*\{\s*Post\s*\}\s*from\s*"\.\.\/utils\/sanity".*\n?/gm,
        ""
      )
      .replace(/as\s+(?:{\s*.*?\s*}|[\w]+);/gm, "");

    fs.writeFile(svelteFilePath, newSvelteFile);
  }

  console.log("Finished");
};

export function transpile(tsx, options) {
  let plugins =
    options.cwd === studioPath
      ? [babelPluginSyntaxJSX, babelPluginReplaceTsExports]
      : [babelPluginSyntaxJSX];

  let mjs = babel.transformSync(tsx, {
    compact: false,
    cwd: options.cwd,
    filename: options.filename,
    plugins,
    presets: [
      [babelPresetTypeScript, { jsx: "preserve", allowDeclareFields: true }],
    ],
    retainLines: true,
  });
  if (!mjs || !mjs.code) throw new Error("Could not parse TypeScript");

  /**
   * Babel's `compact` and `retainLines` options are both bad at formatting code.
   * Use Prettier for nicer formatting.
   */
  return prettier.format(mjs.code, { parser: "babel" });
}

await stripTypeScript(appPath);
await stripTypeScript(studioPath);
