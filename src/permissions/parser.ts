import { getAllowedHosts, getRoot } from "../runtime";
import { getPackageTrace } from "../trace";
import path from "path";
import * as parser from "error-stack-parser";

function isChildOf(parent: string, dir: string) {
  const relative = path.relative(parent, dir);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export function isReadAllowed(path: string, trace: string[]) {
  if (trace.length === 0) return true;
  if (isChildOf(getRoot(), path)) {
    return true;
  }

  return false;
}

export function isWriteAllowed(path: string, trace: string[]) {
  if (trace.length === 0) return true;
  if (isChildOf(getRoot(), path)) {
    return true;
  }

  return false;
}

export function isNetworkAllowed(host: string, trace: string[]) {
  if (trace.length === 0) return true;

  return getAllowedHosts().some((allowedHost) => allowedHost === host);
}
