interface Runtime {
  root: string;
  modulesFolder: string;
  allowedHosts: string[];
}

const runtime: Runtime = {
  root: "",
  modulesFolder: "node_modules",
  allowedHosts: [],
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
