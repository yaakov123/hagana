import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";
import { readFileSync, writeFileSync } from "../natives/$fs";
import {
  temporaryFile,
  temporaryDirectory,
  rootTemporaryDirectory,
  temporaryWriteSync,
} from "tempy";
import { addAllowedFilePath } from "../runtime";

function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

function injectHagana(file: string) {
  console.log(__filename);
  if (file.includes("require")) {
    const line = `const hagana = require("${__filename}")`;
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

  console.log(rootTemporaryDirectory);
  addAllowedFilePath(rootTemporaryDirectory);
  const tempFile = temporaryWriteSync(injected, { name: "script.js" });
  argArray[0] = tempFile;
  //   writeFileSync(resolvedPath, injected, { encoding: "utf-8" });

  return reflectConstruct(target, argArray, newTarget);
}

export function overrideWorker() {
  workerThreads.Worker = createProxy(workerThreads.Worker, {
    construct: onWorkerCreated,
  });
}
