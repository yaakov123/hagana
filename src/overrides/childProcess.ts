import childProcess from "child_process";
import { ShellCommandError } from "../errors";
import { isShellCommandAllowed } from "../permissions/parser";
import { getPackageTrace } from "../trace";

function createCommandString(argArray: any[]) {
  const baseCommand = argArray[0];
  const maybeFlags = argArray[1];
  if (Array.isArray(maybeFlags)) {
    return `${baseCommand} ${maybeFlags.join(" ")}`;
  }

  return baseCommand;
}

function onShellAccess(target: any, thisArg: any, argArray: any[]) {
  const command = createCommandString(argArray);
  if (isShellCommandAllowed(command)) {
    return Reflect.apply(target, thisArg, argArray);
  }

  const trace = getPackageTrace();
  throw new ShellCommandError(command, trace);
}

export function overrideChildProcess() {
  childProcess.exec = new Proxy(childProcess.exec, {
    apply: onShellAccess,
  });

  childProcess.execSync = new Proxy(childProcess.execSync, {
    apply: onShellAccess,
  });

  childProcess.execFile = new Proxy(childProcess.execFile, {
    apply: onShellAccess,
  });

  childProcess.execFileSync = new Proxy(childProcess.execFileSync, {
    apply: onShellAccess,
  });

  childProcess.spawn = new Proxy(childProcess.spawn, {
    apply: onShellAccess,
  });

  childProcess.spawnSync = new Proxy(childProcess.spawnSync, {
    apply: onShellAccess,
  });
}
