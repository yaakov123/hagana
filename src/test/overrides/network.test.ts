import * as hagana from "../../index";
import { beforeAll, describe, expect, test } from "vitest";

import {
  maliciousHttpRequest,
  maliciousLookupBypass,
} from "../fake_modules/malicious-network";

describe("network", () => {
  beforeAll(() => {
    hagana.setRoot(__dirname);
    hagana.setModulesFolder("fake_modules");
  });

  test("it should prevent http.request with counter", () => {
    hagana.setAllowedHosts(["httpbin.org"]);
    expect(maliciousHttpRequest()).rejects.toThrowError();
  });

  // test("it should prevent lookup bypass", async () => {
  //   hagana.setAllowedHosts(["httpbin.org"]);
  //   await maliciousLookupBypass();
  //   // expect(await maliciousLookupBypass()).rejects.toThrowError();
  // });
});
