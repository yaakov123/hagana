const $Array = Array;
const $some = $Array.prototype.some;
const $isArray = $Array.isArray;
const $join = $Array.prototype.join;
const $filter = $Array.prototype.filter;
const $reverse = $Array.prototype.reverse;
const $findIndex = $Array.prototype.findIndex;
const $map = $Array.prototype.map;
const $push = $Array.prototype.push;
const $includes = $Array.prototype.includes;

export function some<T>(
  arr: T[],
  predicate: (value: T, index: number, array: any[]) => unknown,
  thisArg?: any
) {
  return $some.call(arr, predicate, thisArg);
}

export function isArray(arr: any) {
  return $isArray.call($Array, arr);
}

export function join(arr: any[], separator?: string | undefined) {
  return $join.call(arr, separator);
}

export function filter<T>(
  arr: T[],
  predicate: (value: T, index: number, array: any[]) => boolean,
  thisArg?: any
): T[] {
  return $filter.call(arr, predicate, thisArg);
}

export function map(
  arr: any,
  callbackfn: (value: any, index: number, array: any[]) => any,
  thisArg?: any
): any[] {
  return $map.call(arr, callbackfn, thisArg);
}

export function reverse(arr: any[]) {
  return $reverse.call(arr);
}

export function findIndex<T>(
  arr: T[],
  predicate: (value: T, index: number, obj: any[]) => boolean,
  thisArg?: any
) {
  return $findIndex.call(arr, predicate, thisArg);
}

export function push(arr: any[], ...items: any[]) {
  return $push.call(arr, ...items);
}

export function arrayIncludes(
  arr: any[],
  searchElement: any,
  fromIndex?: number
) {
  return $includes.call(arr, searchElement, fromIndex);
}
