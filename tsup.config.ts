import { defineConfig } from "tsup";
import {
  readdirSync,
  existsSync,
  cpSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join } from "path";

const catalogsDir = join(__dirname, "src/catalogs");
const distDir = join(__dirname, "dist");

const catalogDirs = () =>
  existsSync(catalogsDir)
    ? readdirSync(catalogsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

const catalogEntries = Object.fromEntries(
  catalogDirs()
    .map((name) => [
      `catalogs/${name}/index`,
      join(catalogsDir, name, "index.ts"),
    ])
    .filter(([, path]) => existsSync(path as string))
);

// ─── Name helpers (same as add-catalog.js) ───────────────────────────────────

function toValidIdentifier(str: string) {
  return str
    .replace(/[-_\s]+([a-zA-Z0-9])/g, (_, c: string) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9$_]/g, "");
}
function toCamelCase(str: string) {
  const id = toValidIdentifier(str);
  return id.charAt(0).toLowerCase() + id.slice(1);
}
function toPascalCase(str: string) {
  const id = toValidIdentifier(str);
  return id.charAt(0).toUpperCase() + id.slice(1);
}

// ─── DTS helpers ─────────────────────────────────────────────────────────────

function parseCatalogIndex(indexPath: string) {
  const src = readFileSync(indexPath, "utf8");
  const varMatch = src.match(/export (?:const|function) (\w+)[\s(=]/);
  const keyMatch = src.match(/createCatalog\([^,]+,\s*"([^"]+)"\)/);
  const typeMatch = src.match(/import type \{ (\w+) \} from "\.\/types"/);
  return {
    varName: varMatch?.[1] ?? toCamelCase(indexPath),
    keyField: keyMatch?.[1] ?? "id",
    typeName: typeMatch?.[1] ?? "Record",
  };
}

function writeCatalogDts(name: string) {
  const indexSrc = join(catalogsDir, name, "index.ts");
  if (!existsSync(indexSrc)) return;

  const { varName, keyField, typeName } = parseCatalogIndex(indexSrc);
  const destDir = join(distDir, "catalogs", name);

  const typesSrc = join(catalogsDir, name, "types.ts");
  if (existsSync(typesSrc)) {
    const typesContent = readFileSync(typesSrc, "utf8");
    writeFileSync(join(destDir, "types.d.ts"), typesContent);
    writeFileSync(join(destDir, "types.d.mts"), typesContent);
  }

  const dts = [
    `import type { ${typeName} } from "./types";`,
    `import type { Catalog } from "../../core/types";`,
    `export type { ${typeName} };`,
    `export declare const ${varName}: Catalog<${typeName}, "${keyField}">;`,
    "",
  ].join("\n");

  writeFileSync(join(destDir, "index.d.ts"), dts);
  writeFileSync(join(destDir, "index.d.mts"), dts);
}

// ─── Barrel generators ───────────────────────────────────────────────────────

function writeBarrels(dirs: string[]) {
  const cjsLines = ['"use strict";', "Object.defineProperty(exports, '__esModule', { value: true });", ""];
  const esmLines: string[] = [];
  const dtsLines = [
    'export { createCatalog } from "./core/createCatalog";',
    'export type { Catalog, CatalogRecord } from "./core/types";',
    "",
    "// mcc has custom bilingual API",
    'export { mcc } from "./catalogs/mcc";',
    'export type { MccRecord, MccLang } from "./catalogs/mcc";',
  ];

  // core exports
  cjsLines.push('var _core = require("./core/createCatalog.cjs");');
  cjsLines.push("exports.createCatalog = _core.createCatalog;");
  esmLines.push('export { createCatalog } from "./core/createCatalog.js";');
  cjsLines.push("");
  esmLines.push("");

  for (const name of dirs) {
    const indexSrc = join(catalogsDir, name, "index.ts");
    if (!existsSync(indexSrc)) continue;

    const { varName, typeName } = parseCatalogIndex(indexSrc);

    // CJS barrel
    cjsLines.push(`var _${varName} = require("./catalogs/${name}/index.cjs");`);
    cjsLines.push(`exports.${varName} = _${varName}.${varName};`);

    // ESM barrel
    esmLines.push(`export { ${varName} } from "./catalogs/${name}/index.js";`);

    // DTS barrel (only for non-mcc, mcc is handled specially)
    if (name !== "mcc") {
      dtsLines.push(`export { ${varName} } from "./catalogs/${name}";`);
      dtsLines.push(`export type { ${typeName} } from "./catalogs/${name}";`);
    }
  }

  writeFileSync(join(distDir, "index.cjs"), cjsLines.join("\n") + "\n");
  writeFileSync(join(distDir, "index.js"), esmLines.join("\n") + "\n");
  writeFileSync(join(distDir, "index.d.ts"), dtsLines.join("\n") + "\n");
  writeFileSync(join(distDir, "index.d.mts"), dtsLines.join("\n") + "\n");
}

// ─── Core DTS ────────────────────────────────────────────────────────────────

function writeCoreDts() {
  const coreDir = join(distDir, "core");
  for (const file of ["types.ts", "createCatalog.ts"]) {
    const src = join(__dirname, "src/core", file);
    if (!existsSync(src)) continue;
    const content = readFileSync(src, "utf8");
    const base = file.replace(".ts", "");
    writeFileSync(join(coreDir, `${base}.d.ts`), content);
    writeFileSync(join(coreDir, `${base}.d.mts`), content);
  }
}

// ─── Config ──────────────────────────────────────────────────────────────────

export default defineConfig({
  entry: {
    // Individual catalog entries (JSON kept external → tiny bundles)
    ...catalogEntries,
    // Core utilities
    "core/createCatalog": "src/core/createCatalog.ts",
  },
  format: ["esm", "cjs"],
  dts: false,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: false,
  external: [/\.json$/],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
  async onSuccess() {
    const dirs = catalogDirs();

    // Copy JSON files and write catalog DTS
    for (const name of dirs) {
      const srcDir = join(catalogsDir, name);
      const destDir = join(distDir, "catalogs", name);
      const jsonFiles = readdirSync(srcDir).filter((f) => f.endsWith(".json"));
      for (const file of jsonFiles) {
        cpSync(join(srcDir, file), join(destDir, file));
      }
      writeCatalogDts(name);
    }

    writeCoreDts();
    writeBarrels(dirs);

    console.log("  ✅ JSON files copied");
    console.log("  ✅ .d.ts files generated");
    console.log("  ✅ barrel files written");
  },
});
