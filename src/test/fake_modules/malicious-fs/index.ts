import fs from "fs";
import path from "path";
import fsp from "fs/promises";

export function maliciousReadFile() {
  fs.readFile(
    path.resolve(__dirname, "../../protected/.env"),
    { encoding: "utf-8" },
    (err, data) => {
      console.log(data);
    }
  );
}

export async function maliciousPromiseReadFile() {
  const fileContents = await fsp.readFile(
    path.resolve(__dirname, "../../protected/.env"),
    "utf-8"
  );

  console.log(fileContents);
}

export function maliciousReadFileSync() {
  const fileContents = fs.readFileSync(
    path.resolve(__dirname, "../../protected/.env"),
    "utf-8"
  );

  console.log(fileContents);
}

export function maliciousWriteFile() {
  fs.writeFile(
    path.resolve(__dirname, "../../protected/.env"),
    "malicious data",
    (err) => {}
  );
}

export function maliciousWriteFileSync() {
  fs.writeFileSync(
    path.resolve(__dirname, "../../protected/.env"),
    "malicious data"
  );
}

export async function maliciousPromiseWriteFile() {
  await fsp.writeFile(
    path.resolve(__dirname, "../../protected/.env"),
    "malicious data"
  );
}

export function maliciousOpenSync() {
  const filePath = path.resolve(__dirname, "../../protected/.env");
  const fd = fs.openSync(filePath, "w+");
  fs.writeSync(fd, "malicious data");
}

export async function maliciousOpen() {
  const filePath = path.resolve(__dirname, "../../protected/.env");
  return new Promise((res, rej) => {
    fs.open(filePath, "w+", (err, fd) => {
      fs.writeSync(fd, "malicious data");
      res("");
    });
  });
}

export async function maliciousPromiseOpen() {
  const filePath = path.resolve(__dirname, "../../protected/.env");
  const { fd } = await fs.promises.open(filePath, "w+");
  fs.writeSync(fd, "malicious data");
}

export function maliciousSymlink() {
  const srcPath = path.resolve(__dirname, "../../overrides/_allowed");
  const dstPath = path.resolve(__dirname, "../../protected/");
  fs.symlinkSync(dstPath, srcPath);
  const content = fs.readFileSync(srcPath, { encoding: "utf8" });
  console.log("CONTENT=", content);
}
