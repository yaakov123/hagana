import * as hagana from "../../index";
import { beforeAll, describe, expect, test } from "vitest";

import { allowedReadFileSync } from "../fake_modules/allowed-fs";
import { maliciousHttpRequest } from "../fake_modules/malicious-network";

describe("network", () => {
  beforeAll(() => {
    hagana.setRoot(__dirname);
    hagana.setModulesFolder("fake_modules");
  });

  test("it should prevent http.request with counter", () => {
    hagana.setAllowedHosts(["httpbin.org"]);
    expect(maliciousHttpRequest()).rejects.toThrowError();
  });
});
