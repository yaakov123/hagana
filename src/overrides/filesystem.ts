import Module from "module";
import fs from "fs";
import { createProxy } from "../proxy";
import { isReadAllowed, isWriteAllowed } from "../permissions/parser";
import { FileSystemForbiddenError } from "../errors";
import { Operation } from "../types";
import { getPackageTrace } from "../trace";
import { getRoot } from "../runtime";

function onRead(target: any, thisArg: any, argArray: any) {
  const trace = getPackageTrace();
  if (isReadAllowed(argArray[0], trace)) {
    return Reflect.apply(target, thisArg, argArray);
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
  if (isWriteAllowed(argArray[0], trace)) {
    return Reflect.apply(target, thisArg, argArray);
  }

  throw new FileSystemForbiddenError(
    Operation.FILE_WRITE,
    trace,
    argArray[0],
    getRoot()
  );
}

function overrideFSRead() {
  Module.prototype.require = createProxy(Module.prototype.require, {
    apply(target, thisArg, argArray) {
      return Reflect.apply(target, thisArg, argArray);
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

export function overrideFS() {
  overrideFSRead();
  overrideFSWrite();
}
