import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";
import { readFileSync } from "../natives/$fs";
import { rootTemporaryDirectory, temporaryWriteSync } from "tempy";
import {
  addAllowedFilePath,
  getAllowedCommands,
  getAllowedFilePaths,
  getAllowedHosts,
  getModulesFolder,
  getRoot,
} from "../runtime";

function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

function injectHagana(file: string) {
  // Only inject if we're not using ESM
  if (file.includes("require(") || !file.includes("import")) {
    const haganaImport = `const hagana = require("${__filename}")`;
    const line = `${haganaImport}
    hagana.setRoot("${getRoot()}");
    hagana.setModulesFolder("${getModulesFolder()}");
    hagana.setAllowedCommands(${JSON.stringify(getAllowedCommands())});
    hagana.setAllowedHosts(${JSON.stringify(getAllowedHosts())});
    
    `;
    if (file.includes(line)) return file;

    return `
    ${line}
    ${file}
    `;
  }

  return file;
}

function onWorkerCreated(target: any, argArray: any, newTarget: any) {
  const resolvedPath = resolvePathByCWD(argArray[0]);
  const workerFile = readFileSync(resolvedPath, "utf-8");
  const injected = injectHagana(workerFile);

  addAllowedFilePath(rootTemporaryDirectory);
  const tempFile = temporaryWriteSync(injected, { name: "worker.js" });
  argArray[0] = tempFile;

  return reflectConstruct(target, argArray, newTarget);
}

export function overrideWorker() {
  workerThreads.Worker = createProxy(workerThreads.Worker, {
    construct: onWorkerCreated,
  });
}
