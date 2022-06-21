import {
  filter,
  findIndex,
  isArray,
  join,
  map,
  reverse,
  some,
} from "../../natives/$array";
import { expect, describe, test } from "vitest";
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
