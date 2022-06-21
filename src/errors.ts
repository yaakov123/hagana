import { join } from "./natives/$array";
import { $Error } from "./natives/$error";
import { Operation } from "./types";

export class FileSystemForbiddenError extends $Error {
  constructor(
    operation: Operation,
    packageTrace: string[],
    path: string,
    root: string
  ) {
    super(`
    File system operation ${operation} is forbidden
    Attempted to access ${path}
    Project root is ${root}
    Trace: ${join(packageTrace, "->")}
    `);

    this.stack = "";
  }
}

export class NetworkForbiddenError extends $Error {
  constructor(host: string, packageTrace: string[]) {
    super(`
    Network access forbidden
    Attempted to access ${host}
    Trace: ${join(packageTrace, "->")}
    `);

    this.stack = "";
  }
}

export class ShellCommandError extends $Error {
  constructor(command: string, packageTrace: string[]) {
    super(`
    Shell access forbidden
    Attempted to run "${command}"
    Trace: ${join(packageTrace, "->")}
    `);

    this.stack = "";
  }
}
