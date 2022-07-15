import workerThreads from "node:worker_threads";
import { reflectConstruct } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { isAbsolute, resolve } from "../natives/$path";

import { inject } from "../utils/inject";

export function resolvePathByCWD(filePath: string) {
  return isAbsolute(filePath) ? filePath : resolve(process.cwd(), filePath);
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
