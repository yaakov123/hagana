import { overrideFS } from "./overrides/filesystem";
import { setRoot, setModulesFolder } from "./runtime";

function determineProjectRoot() {
  return process.cwd();
}

const root = determineProjectRoot();
setRoot(root);
overrideFS();

export { setRoot, setModulesFolder };
