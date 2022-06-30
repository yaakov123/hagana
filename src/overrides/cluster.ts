import cluster from "cluster";
import { reflectApply } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { inject } from "../utils/inject";

function onClusterSetup(target: any, thisArg: any, argArray: any[]) {
  const filePath = argArray[0]?.exec;
  console.log(argArray);
  if (!filePath) {
    return reflectApply(target, thisArg, argArray);
  }

  argArray[0].exec = inject(filePath);

  return reflectApply(target, thisArg, argArray);
}

export function overrideCluster() {
  if (Object.hasOwn(cluster, "setupMaster")) {
    cluster.setupMaster = createProxy(cluster.setupMaster, {
      apply: onClusterSetup,
    });
  }

  if (Object.hasOwn(cluster, "setupPrimary")) {
    cluster.setupPrimary = createProxy(cluster.setupPrimary, {
      apply: onClusterSetup,
    });
  }
}
