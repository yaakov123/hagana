import { $WeakMap, weakMapGet, weakMapSet } from "../../natives/$weakMap";
import { expect, describe, test } from "vitest";

describe("$weakMap", () => {
  test("set", () => {
    const map = new $WeakMap();
    const key = {};
    weakMapSet(map, key, 10);
    expect(weakMapGet(map, key)).toEqual(10);
  });
});
