import { getRoot } from "../runtime";
import { getPackageTrace } from "../trace";
import path from "path";

function isChildOf(parent: string, dir: string) {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export function isReadAllowed(path: string) {
  const trace = getPackageTrace();
  if (trace.length === 0) return true;
  if (isChildOf(getRoot(), path)) {
    return true;
  }

  return false;
}

export function isWriteAllowed(path: string) {
  const trace = getPackageTrace();
  if (trace.length === 0) return true;
  if (isChildOf(getRoot(), path)) {
    return true;
  }

  return false;
}
