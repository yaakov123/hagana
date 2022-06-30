import { overrideFS } from "./overrides/fileSystem";
import { overrideNetwork } from "./overrides/network";
import { overrideChildProcess } from "./overrides/childProcess";
import {
  setRoot,
  setModulesFolder,
  setAllowedHosts,
  setAllowedCommands,
} from "./runtime";
import appRoot from "app-root-path";
import { overrideWorker } from "./overrides/worker";
import { overrideCluster } from "./overrides/cluster";

setRoot(appRoot.path);

// Overrides
overrideFS();
overrideNetwork();
overrideChildProcess();
overrideWorker();
overrideCluster();

export { setRoot, setModulesFolder, setAllowedHosts, setAllowedCommands };
