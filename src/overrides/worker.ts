import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";
import { readFileSync } from "../natives/$fs";
import { root, writeSync } from "tempy";
import {
  addAllowedFilePath,
  getAllowedCommands,
  getAllowedHosts,
  getModulesFolder,
  getRoot,
} from "../runtime";
import { includes } from "../natives/$string";
import { inject } from "../utils/inject";

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

function onWorkerCreated(target: any, argArray: any, newTarget: any) {
  argArray[0] = inject(argArray[0]);
  return reflectConstruct(target, argArray, newTarget);
}

export function overrideWorker() {
  workerThreads.Worker = createProxy(workerThreads.Worker, {
    construct: onWorkerCreated,
  });
}
