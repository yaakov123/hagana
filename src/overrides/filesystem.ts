import Module from "module";
import fs from "fs";
import { createProxy } from "../proxy";
import { getRoot } from "../runtime";
import { getPackageTrace } from "../trace";
import { isReadAllowed } from "../permissions/parser";

function onRead(target: any, thisArg: any, argArray: any) {
  if (isReadAllowed(argArray[0])) {
    return Reflect.apply(target, thisArg, argArray);
  }
}

function onWrite(target: any, thisArg: any, argArray: any) {
  console.log("onWrite: ", argArray[0]);
  return Reflect.apply(target, thisArg, argArray);
}

function overrideFSRead() {
  // Module.prototype.require = createProxy(Module.prototype.require, {
  //   apply(target, thisArg, argArray) {
  //     return Reflect.apply(target, thisArg, argArray);
  //   },
  // });

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
