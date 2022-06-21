const $Object = Object;

const $hasOwnProperty = $Object.prototype.hasOwnProperty;

export function hasOwnProperty(obj: object, v: PropertyKey) {
  return $hasOwnProperty.call(obj, v);
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("$object", () => {
    test("hasOwnProperty", () => {
      const obj = { a: 1 };
      expect(hasOwnProperty(obj, "a")).toEqual(true);
    });
  });
}
