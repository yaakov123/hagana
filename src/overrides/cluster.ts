import cluster from "cluster";
import { hasOwnProperty } from "../natives/$object";
import { reflectApply } from "../natives/$proxy";
import { createProxy } from "../proxy";
import { inject } from "../utils/inject";

function onClusterSetup(target: any, thisArg: any, argArray: any[]) {
  const filePath = argArray[0]?.exec;
  if (!filePath) {
    return reflectApply(target, thisArg, argArray);
  }

  argArray[0].exec = inject(filePath);

  return reflectApply(target, thisArg, argArray);
}

export function overrideCluster() {
  if (hasOwnProperty(cluster, "setupMaster")) {
    cluster.setupMaster = createProxy(cluster.setupMaster, {
      apply: onClusterSetup,
    });
  }

  if (hasOwnProperty(cluster, "setupPrimary")) {
    cluster.setupPrimary = createProxy(cluster.setupPrimary, {
      apply: onClusterSetup,
    });
  }
}
