import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";
import fs from "fs";
import { readFileSync } from "../natives/$fs";
import {
  addAllowedFilePath,
  getAllowedFilePaths,
  removeAllowedFilePath,
} from "../runtime";
function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
}

function onWorkerCreated(target: any, argArray: any, newTarget: any) {
  const resolvedPath = resolvePathByCWD(argArray[0]);
  const file = readFileSync(resolvedPath, "utf-8");
  console.log(file);
  return reflectConstruct(target, argArray, newTarget);
}

export function overrideWorker() {
  workerThreads.Worker = createProxy(workerThreads.Worker, {
    construct: onWorkerCreated,
  });
}
