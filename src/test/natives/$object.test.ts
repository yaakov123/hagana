import { hasOwnProperty } from "../../natives/$object";
import { expect, describe, test } from "vitest";

describe("$object", () => {
  test("hasOwnProperty", () => {
    const obj = { a: 1 };
    expect(hasOwnProperty(obj, "a")).toEqual(true);
  });
});
