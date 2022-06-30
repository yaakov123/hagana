import { readFileSync } from "../natives/$fs";
import { isAbsolute, resolve } from "../natives/$path";
import { includes } from "../natives/$string";
import {
  addAllowedFilePath,
  getAllowedCommands,
  getAllowedHosts,
  getModulesFolder,
  getRoot,
} from "../runtime";
import { root, writeSync } from "tempy";

export function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

export function injectHagana(file: string) {
  // Only inject if we're not using ESM
  if (includes(file, "require(") || !includes(file, "import")) {
    const haganaImport = `const hagana = require("${__filename}")`;
    const line = `${haganaImport}
      hagana.setRoot("${getRoot()}");
      hagana.setModulesFolder("${getModulesFolder()}");
      hagana.setAllowedCommands(${JSON.stringify(getAllowedCommands())});
      hagana.setAllowedHosts(${JSON.stringify(getAllowedHosts())});
      
      `;
    if (includes(file, line)) return file;

    return `
      ${line}
      ${file}
      `;
  }

  return file;
}

export function inject(path: string) {
  const resolvedPath = resolvePathByCWD(path);
  const workerFile = readFileSync(resolvedPath, "utf-8");
  const injected = injectHagana(workerFile);
  addAllowedFilePath(root);
  const tempFile = writeSync(injected, { name: "worker.js" });
  return tempFile;
}
