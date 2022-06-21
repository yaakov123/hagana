const $Array = Array;
const $some = $Array.prototype.some;
const $isArray = $Array.isArray;
const $join = $Array.prototype.join;
const $filter = $Array.prototype.filter;
const $reverse = $Array.prototype.reverse;
const $findIndex = $Array.prototype.findIndex;
const $map = $Array.prototype.map;

export function some(
  arr: any[],
  predicate: (value: any, index: number, array: any[]) => unknown,
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

export function findIndex(
  arr: any[],
  predicate: (value: any, index: number, obj: any[]) => boolean,
  thisArg?: any
) {
  return $findIndex.call(arr, predicate, thisArg);
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("$array", () => {
    test("startsWith", () => {
      expect(some([1, 2, 3], (item) => item === 2)).toEqual(true);
      expect(some([1, 2, 3], (item) => item === 4)).toEqual(false);
    });

    test("isArray", () => {
      expect(isArray([1, 2, 3])).toEqual(true);
      expect(isArray(10)).toEqual(false);
    });

    test("join", () => {
      expect(join([1, 2, 3], "->")).toEqual("1->2->3");
    });

    test("filter", () => {
      expect(filter([1, 2, 3], (item) => item % 2 !== 0)).toEqual([1, 3]);
    });

    test("reverse", () => {
      expect(reverse([1, 2])).toEqual([2, 1]);
    });

    test("findIndex", () => {
      expect(findIndex([1, 2, 3], (item) => item === 1)).toEqual(0);
      expect(findIndex([1, 2, 3], (item) => item === 4)).toEqual(-1);
    });

    test("map", () => {
      expect(map([1, 2, 3], (item) => item * 2)).toEqual([2, 4, 6]);
    });
  });
}
