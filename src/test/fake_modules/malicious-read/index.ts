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
  fs.writeFileSync(path.resolve(__dirname, "../../protected/.env"), "utf-8");
}

export async function maliciousPromiseWriteFile() {
  await fsp.writeFile(
    path.resolve(__dirname, "../../protected/.env"),
    "malicious data"
  );
}
