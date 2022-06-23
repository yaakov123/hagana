import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";
import { readFileSync } from "../natives/$fs";
import { rootTemporaryDirectory, temporaryWriteSync } from "tempy";
import {
  addAllowedFilePath,
  getAllowedCommands,
  getAllowedHosts,
  getModulesFolder,
  getRoot,
} from "../runtime";
import { includes } from "../natives/$string";

function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

function injectHagana(file: string) {
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
