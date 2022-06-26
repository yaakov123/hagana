import {
  getAllowedCommands,
  getAllowedFilePaths,
  getAllowedHosts,
  getRoot,
} from "../runtime";
import { startsWith } from "../natives/$string";
import { isAbsolute, relative } from "../natives/$path";
import { some } from "../natives/$array";

function isChildOf(parent: string, dir: string) {
  const relativePath = relative(parent, dir);

  return (
    relativePath && !startsWith(relativePath, "..") && !isAbsolute(relativePath)
  );
}

export function isReadAllowed(path: string, trace: string[]) {
  if (trace.length === 0) return true;
  if (isChildOf(getRoot(), path)) {
    return true;
  }

  return false;
}

export function isFSOperationAllowed(path: string, trace: string[]) {
  if (trace.length === 0) return true;
  if (
    isChildOf(getRoot(), path) ||
    some(getAllowedFilePaths(), (allowedPath) => startsWith(path, allowedPath))
  ) {
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

  return some(getAllowedHosts(), (allowedHost) => allowedHost === host);
}

export function isShellCommandAllowed(command: string) {
  return some(
    getAllowedCommands(),
    (allowedCommand) => command === allowedCommand
  );
}
