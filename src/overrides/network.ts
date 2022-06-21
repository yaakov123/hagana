import http from "http";
import https from "https";
import { NetworkForbiddenError } from "../errors";
import { reflectApply } from "../natives/$proxy";
import { $URL } from "../natives/$url";
import { isNetworkAllowed } from "../permissions/parser";
import { createProxy } from "../proxy";
import { getPackageTrace } from "../trace";

function extractHost(argArray: Args) {
  const firstArg = argArray[0];
  if (typeof firstArg === "string") {
    return new $URL(firstArg).hostname;
  }

  if (firstArg instanceof $URL) {
    return firstArg.hostname;
  }

  return firstArg.hostname || "";
}

type Args =
  | [http.RequestOptions | string | URL, (res: http.IncomingMessage) => void]
  | [string | URL, http.RequestOptions, (res: http.IncomingMessage) => void];

function onHttpNetwork(target: any, thisArg: any, argArray: Args) {
  const host = extractHost(argArray);
  const trace = getPackageTrace();
  if (isNetworkAllowed(host, trace)) {
    return reflectApply(target, thisArg, argArray);
  }

  throw new NetworkForbiddenError(host, trace);
}

export function overrideNetwork() {
  http.request = createProxy(http.request, {
    apply: onHttpNetwork,
  });

  https.request = createProxy(https.request, {
    apply: onHttpNetwork,
  });
}
