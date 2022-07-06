import Module from "module";
import fs from "fs";
import { createProxy } from "../proxy";
import { isFSOperationAllowed } from "../permissions/parser";
import { FileSystemForbiddenError } from "../errors";
import { Operation } from "../types";
import { getPackageTrace } from "../trace";
import { getRoot } from "../runtime";
import { reflectApply } from "../natives/$proxy";
import { setFdToPath } from "../maps/fdToPath";

function onRead(target: any, thisArg: any, argArray: any) {
  const trace = getPackageTrace();
  if (isFSOperationAllowed(argArray[0], trace)) {
    return reflectApply(target, thisArg, argArray);
  }

  throw new FileSystemForbiddenError(
    Operation.FILE_READ,
    trace,
    argArray[0],
    getRoot()
  );
}

function onWrite(target: any, thisArg: any, argArray: any) {
  const trace = getPackageTrace();
  if (isFSOperationAllowed(argArray[0], trace)) {
    return reflectApply(target, thisArg, argArray);
  }

  throw new FileSystemForbiddenError(
    Operation.FILE_WRITE,
    trace,
    argArray[0],
    getRoot()
  );
}

function onFsOperation(target: any, thisArg: any, argArray: any[]) {
  const trace = getPackageTrace();
  if (isFSOperationAllowed(argArray[0], trace)) {
    return reflectApply(target, thisArg, argArray);
  }

  throw new FileSystemForbiddenError(
    target.name,
    trace,
    argArray[0],
    getRoot()
  );
}

function overrideFSRead() {
  Module.prototype.require = createProxy(Module.prototype.require, {
    apply(target, thisArg, argArray) {
      return reflectApply(target, thisArg, argArray);
    },
  });

  fs.promises.readFile = createProxy(fs.promises.readFile, {
    apply: onRead,
  });

  fs.readFile = createProxy(fs.readFile, {
    apply: onRead,
  });

  fs.readFileSync = createProxy(fs.readFileSync, {
    apply: onRead,
  });
}

function overrideFSWrite() {
  fs.writeFile = createProxy(fs.writeFile, {
    apply: onWrite,
  });

  fs.writeFileSync = createProxy(fs.writeFileSync, {
    apply: onWrite,
  });

  fs.promises.writeFile = createProxy(fs.promises.writeFile, {
    apply: onWrite,
  });
}

function onFSSocketOperation(target: any, thisArg: any, argArray: any[]) {
  const fd = onFsOperation(target, thisArg, argArray);
  setFdToPath(fd, argArray[0]);
  return fd;
}

function overrideOtherFS() {
  fs.open = createProxy(fs.open, {
    apply: onFSSocketOperation,
  });

  fs.openSync = createProxy(fs.openSync, {
    apply: onFSSocketOperation,
  });

  fs.promises.open = createProxy(fs.promises.open, {
    apply: onFSSocketOperation,
  });

  fs.symlinkSync = createProxy(fs.symlinkSync, {
    apply: onFsOperation,
  });

  fs.symlink = createProxy(fs.symlink, {
    apply: onFsOperation,
  });

  fs.promises.symlink = createProxy(fs.promises.symlink, {
    apply: onFsOperation,
  });
}

export function overrideFS() {
  overrideFSRead();
  overrideFSWrite();
  overrideOtherFS();
}
