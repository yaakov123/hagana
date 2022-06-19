import { getAllowedCommands, getAllowedHosts, getRoot } from "../runtime";
import path from "path";

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

export function isShellCommandAllowed(command: string) {
  return getAllowedCommands().some((allowedCommand) =>
    command.startsWith(allowedCommand)
  );
}
