import {
  getAllowedCommands,
  getAllowedFilePaths,
  getAllowedHosts,
  getRoot,
} from "../runtime";
import { split, startsWith } from "../natives/$string";
import { isAbsolute, relative } from "../natives/$path";
import { some } from "../natives/$array";
import { getPathFromFd } from "../maps/fdToPath";

function isChildOf(parent: string, dir: string | number) {
  if (typeof dir === "number") {
    dir = getPathFromFd(dir);
  }

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
  return some(getAllowedCommands(), (allowedCommand) => {
    const allowedSplit = split(allowedCommand, " ");
    const commandSplit = split(command, " ");

    if (allowedSplit.length !== commandSplit.length) return;

    for (let i = 0; i < allowedSplit.length; i++) {
      const allowedSeg = allowedSplit[i];
      const commandSeg = commandSplit[i];

      if (allowedSeg !== commandSeg && allowedSeg !== "*") {
        return false;
      }
    }

    return true;
  });
}
