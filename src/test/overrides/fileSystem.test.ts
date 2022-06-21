import hagana from "../../index";
import { beforeAll, describe, expect, test } from "vitest";
import {
  maliciousPromiseReadFile,
  maliciousPromiseWriteFile,
  maliciousReadFile,
  maliciousReadFileSync,
  maliciousWriteFile,
  maliciousWriteFileSync,
} from "../fake_modules/malicious-read";
import { allowedReadFileSync } from "../fake_modules/allowed-read";

describe("fileSystem", () => {
  beforeAll(() => {
    hagana.setRoot(__dirname);
    hagana.setModulesFolder("fake_modules");
  });

  test("it should prevent fs.readFile", () => {
    expect(() => {
      maliciousReadFile();
    }).toThrowError();
  });

  test("it should prevent fs/promises.readFile", async () => {
    await expect(maliciousPromiseReadFile()).rejects.toThrowError();
  });

  test("it should prevent fs.readFileSync", () => {
    expect(() => {
      maliciousReadFileSync();
    }).toThrowError();
  });

  test("it should prevent fs.writeFile", () => {
    expect(() => {
      maliciousWriteFile();
    }).toThrowError();
  });

  test("it should prevent fs/promises.writeFile", () => {
    expect(maliciousPromiseWriteFile()).rejects.toThrowError();
  });

  test("it should prevent fs.writeFileSync", () => {
    expect(() => {
      maliciousWriteFileSync();
    }).toThrowError();
  });

  test("it should allow fs.readFileSync", () => {
    try {
      allowedReadFileSync();
      expect(true).toBe(true);
    } catch (e: any) {
      expect(true).toBe(false);
    }
  });
});
