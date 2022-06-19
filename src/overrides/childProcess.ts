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

export function overrideChildProcess() {
  childProcess.exec = new Proxy(childProcess.exec, {
    apply: function (target, thisArg, argArray) {
      if (isShellCommandAllowed(argArray[0])) {
        return Reflect.apply(target, thisArg, argArray);
      }

      const trace = getPackageTrace();
      throw new ShellCommandError(argArray[0], trace);
    },
  });

  childProcess.execFile = new Proxy(childProcess.execFile, {
    apply: function (target, thisArg, argArray) {
      const command = createCommandString(argArray);
      if (isShellCommandAllowed(command)) {
        return Reflect.apply(target, thisArg, argArray);
      }

      const trace = getPackageTrace();
      throw new ShellCommandError(command, trace);
    },
  });

  childProcess.execFileSync = new Proxy(childProcess.execFileSync, {
    apply: function (target, thisArg, argArray) {
      const command = createCommandString(argArray);
      if (isShellCommandAllowed(command)) {
        return Reflect.apply(target, thisArg, argArray);
      }

      const trace = getPackageTrace();
      throw new ShellCommandError(command, trace);
    },
  });

  childProcess.spawn = new Proxy(childProcess.spawn, {
    apply: function (target, thisArg, argArray) {
      const command = createCommandString(argArray);
      if (isShellCommandAllowed(command)) {
        return Reflect.apply(target, thisArg, argArray);
      }

      const trace = getPackageTrace();
      throw new ShellCommandError(command, trace);
    },
  });
}
