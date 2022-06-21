import { $WeakMap, weakMapGet, weakMapSet } from "./natives/$weakMap";
import { $Proxy } from "./natives/$proxy";

const proxyToOriginalMap = new $WeakMap();

export function getOriginal(proxy: any) {
  return weakMapGet(proxyToOriginalMap, proxy);
}

export function setProxy(proxy: any, original: any) {
  return weakMapSet(proxyToOriginalMap, proxy, original);
}

export function createProxy(target: any, handler: ProxyHandler<any>) {
  const proxy = new $Proxy(target, handler);
  setProxy(proxy, target);
  return proxy;
}
