const proxyToOriginalMap = new WeakMap();

export function getOriginal(proxy: any) {
  return proxyToOriginalMap.get(proxy);
}

export function setProxy(proxy: any, original: any) {
  proxyToOriginalMap.set(proxy, original);
}

export function createProxy(target: any, handler: ProxyHandler<any>) {
  const proxy = new Proxy(target, handler);
  setProxy(proxy, target);
  return proxy;
}
