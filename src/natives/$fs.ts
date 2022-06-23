import fs from "fs";
import { addAllowedFilePath, removeAllowedFilePath } from "../runtime";
const $fs = fs;
const $readFileSync = $fs.readFileSync;
const $writeFileSync = $fs.writeFileSync;

export function readFileSync(filePath: string, options?: any) {
  addAllowedFilePath(filePath);
  const file = $readFileSync.call($fs, filePath, options);
  removeAllowedFilePath(filePath);

  return file.toString();
}
export function writeFileSync(
  filePath: string,
  data: string | NodeJS.ArrayBufferView,
  options?: fs.WriteFileOptions | undefined
) {
  addAllowedFilePath(filePath);
  const result = $writeFileSync.call($fs, filePath, data, options);
  removeAllowedFilePath(filePath);
  return result;
}
