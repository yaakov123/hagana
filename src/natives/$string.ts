const $startsWith = String.prototype.startsWith;
const $includes = String.prototype.includes;
const $split = String.prototype.split;

export function startsWith(
  targetString: string,
  searchString: string,
  position?: number | undefined
) {
  return $startsWith.call(targetString, searchString, position);
}

export function includes(
  targetString: string,
  searchString: string,
  position?: number | undefined
) {
  return $includes.call(targetString, searchString, position);
}

export function split(
  targetString: string,
  separator: any,
  limit?: number | undefined
) {
  return $split.call(targetString, separator, limit);
}

if (import.meta.vitest) {
  const { describe, test, expect } = import.meta.vitest;

  describe("$string", () => {
    test("startsWith", () => {
      expect(startsWith("abc", "ab")).toEqual(true);
      expect(startsWith("abc", "ba")).toEqual(false);
    });

    test("includes", () => {
      expect(includes("abc", "ab")).toEqual(true);
      expect(includes("abc", "ba")).toEqual(false);
      expect(includes("abc", "bc")).toEqual(true);
    });

    test("split", () => {
      expect(split("a/a", "/")).toEqual(["a", "a"]);
    });
  });
}
