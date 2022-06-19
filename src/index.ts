import { overrideFS } from "./overrides/filesystem";
import { overrideNetwork } from "./overrides/network";
import { setRoot, setModulesFolder, setAllowedHosts } from "./runtime";

function determineProjectRoot() {
  return process.cwd();
}

const root = determineProjectRoot();
setRoot(root);
overrideFS();
overrideNetwork();

export { setRoot, setModulesFolder, setAllowedHosts };
