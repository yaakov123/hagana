export const $WeakMap = WeakMap;
const $weakMapSet = $WeakMap.prototype.set;
const $weakMapGet = $WeakMap.prototype.get;

export function weakMapSet(map: WeakMap<any, any>, key: object, value: any) {
  return $weakMapSet.call(map, key, value);
}

export function weakMapGet(map: WeakMap<any, any>, key: object) {
  return $weakMapGet.call(map, key);
}
