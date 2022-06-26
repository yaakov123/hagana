import * as hagana from "../../index";
import { beforeAll, describe, expect, test } from "vitest";
import { maliciousShell } from "../fake_modules/malicious-shell";

describe("childProcess", () => {
  beforeAll(() => {
    hagana.setRoot(__dirname);
    hagana.setModulesFolder("fake_modules");
  });

  test("it should allow wildcard shell", () => {
    hagana.setAllowedCommands(["node -v"]);
    expect(() => {
      maliciousShell();
    }).toThrow();
  });
});
