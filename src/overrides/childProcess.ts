import childProcess from "child_process";
import { ShellCommandError } from "../errors";
import { isArray, join } from "../natives/$array";
import { reflectApply } from "../natives/$proxy";
import { isShellCommandAllowed } from "../permissions/parser";
import { createProxy } from "../proxy";
import { getPackageTrace } from "../trace";

function createCommandString(argArray: any[]) {
  const baseCommand = argArray[0];
  const maybeFlags = argArray[1];
  if (isArray(maybeFlags)) {
    return `${baseCommand} ${join(maybeFlags, " ")}`;
  }

  return baseCommand;
}

function onShellAccess(target: any, thisArg: any, argArray: any[]) {
  const command = createCommandString(argArray);
  if (isShellCommandAllowed(command)) {
    return reflectApply(target, thisArg, argArray);
  }

  const trace = getPackageTrace();
  throw new ShellCommandError(command, trace);
}

export function overrideChildProcess() {
  childProcess.exec = createProxy(childProcess.exec, {
    apply: onShellAccess,
  });

  childProcess.execSync = createProxy(childProcess.execSync, {
    apply: onShellAccess,
  });

  childProcess.execFile = createProxy(childProcess.execFile, {
    apply: onShellAccess,
  });

  childProcess.execFileSync = createProxy(childProcess.execFileSync, {
    apply: onShellAccess,
  });

  childProcess.spawn = createProxy(childProcess.spawn, {
    apply: onShellAccess,
  });

  childProcess.spawnSync = createProxy(childProcess.spawnSync, {
    apply: onShellAccess,
  });
}
