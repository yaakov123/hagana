interface Runtime {
  root: string;
  modulesFolder: string;
}

const runtime: Runtime = {
  root: "",
  modulesFolder: "node_modules",
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
