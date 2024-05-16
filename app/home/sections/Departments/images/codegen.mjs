// @ts-check

/**
 * This file is used to generate a TypeScript file including all image entries.
 * Make uses of the low level TypeScript Compiler API to generate the AST nodes.
 */
import { readdir, writeFile } from "fs/promises";
import { dirname, parse } from "path";
import { fileURLToPath } from "url";

import {
  tsAsConst,
  tsCodeOutput,
  tsExportConst,
  tsFunc,
  tsObj,
  tsSatisfies,
  tsStr,
} from "./ts-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const content = [
  `
import { DepartmentImage } from "./types";
`,
];

/**
 * @type {(str: string) => string}
 */
const camelCase = (str) => {
  return str
    .split("-")
    .map((word, index) => {
      return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
    })
    .join("");
};

async function main() {
  const files = await readdir(__dirname);
  for (const file of files) {
    if (!file.endsWith(".png")) continue;
    const { name: fileName } = parse(file);
    const [name, title] = fileName.split(" - ");
    if (!title || !name) continue;
    /**
     * @type {import("./types").DepartmentImage}
     */
    const data = {
      name,
      title,
      src: file,
    };
    content.push(
      tsCodeOutput(
        tsExportConst(
          camelCase(name.toLowerCase()) + "Image",
          tsSatisfies(
            tsAsConst(
              tsObj({
                name: tsStr(data.name),
                title: tsStr(data.title),
                src: tsFunc("require", [tsStr(`./${data.src}`)]),
              })
            ),
            "DepartmentImage"
          )
        )
      )
    );
  }
  await writeFile(__dirname + "/raw-images.ts", content.join("\n\n"), "utf-8");
}
main().catch(console.error);
