import { filter, push } from "./natives/$array";

interface Runtime {
  root: string;
  modulesFolder: string;
  allowedHosts: string[];
  allowedCommands: string[];
  allowedFilePaths: string[];
}

const runtime: Runtime = {
  root: "",
  modulesFolder: "node_modules",
  allowedHosts: [],
  allowedCommands: [],
  allowedFilePaths: [],
};

export function setRoot(root: string) {
  runtime.root = root;
}

export function getRoot() {
  return runtime.root;
}

export function setModulesFolder(folder: string) {
  runtime.modulesFolder = folder;
}

export function getModulesFolder() {
  return runtime.modulesFolder;
}

export function setAllowedHosts(hosts: string[]) {
  runtime.allowedHosts = hosts;
}

export function getAllowedHosts() {
  return runtime.allowedHosts;
}

export function setAllowedCommands(commands: string[]) {
  runtime.allowedCommands = commands;
}

export function getAllowedCommands() {
  return runtime.allowedCommands;
}

export function addAllowedFilePath(path: string) {
  push(runtime.allowedFilePaths, path);
}

export function removeAllowedFilePath(path: string) {
  runtime.allowedFilePaths = filter(
    runtime.allowedFilePaths,
    (allowedPath) => allowedPath !== path
  );
}

export function getAllowedFilePaths() {
  return runtime.allowedFilePaths;
}
