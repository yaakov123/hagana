import { overrideFS } from "./overrides/fileSystem";
import { overrideNetwork } from "./overrides/network";
import { overrideChildProcess } from "./overrides/childProcess";
import {
  setRoot,
  setModulesFolder,
  setAllowedHosts,
  setAllowedCommands,
} from "./runtime";
// import appRoot from "app-root-path";

setRoot(process.cwd());

// Overrides
overrideFS();
overrideNetwork();
overrideChildProcess();

export default {
  setRoot,
  setModulesFolder,
  setAllowedHosts,
  setAllowedCommands,
};
