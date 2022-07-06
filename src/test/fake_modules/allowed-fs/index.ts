import fs from "fs";
import path from "path";

export function allowedReadFileSync() {
  const fileContents = fs.readFileSync(
    path.resolve(__dirname, "../../overrides/allowed/.env"),
    "utf-8"
  );
}

export function allowedReadFileFd() {
  const filePath = path.resolve(__dirname, "../../overrides/allowed/.env");
  const socket = fs.openSync(filePath, "r");
  const fileContents = fs.readFileSync(socket);
}
