import fs from "fs";
import { addAllowedFilePath, removeAllowedFilePath } from "../runtime";
const $fs = fs;
const $readFileSync = $fs.readFileSync;
const $openSync = $fs.openSync;

export function readFileSync(filePath: string, options?: any) {
  addAllowedFilePath(filePath);
  const file = $readFileSync.call($fs, filePath, options);
  removeAllowedFilePath(filePath);

  return file;
}
