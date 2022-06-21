import { includes, split, startsWith } from "../../natives/$string";
import { expect, describe, test } from "vitest";

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
