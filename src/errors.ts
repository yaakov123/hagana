import { Operation } from "./types";

export class NetworkForbiddenError extends Error {
  constructor(host: string, packageTrace: string[]) {
    super(`
    Network access forbidden
    Attempted to access ${host}
    Trace: ${packageTrace.join("=>")}
    `);
  }
}

export class FileSystemForbiddenError extends Error {
  constructor(operation: Operation, packageTrace: string[], path: string) {
    super(`
    File system operation ${operation} is forbidden
    Attempted to access ${path}
    Trace: ${packageTrace.join("=>")}
    `);
  }
}

export class EnvironmentError extends Error {
  constructor(operation: Operation, packageTrace: string[], variable: string) {
    super(`
    Environment operation ${operation} is forbidden
    Attempted to access ${variable}
    Trace: ${packageTrace.join("=>")}
    `);
  }
}

export class UserError extends Error {
  constructor(operation: Operation, packageTrace: string[], name: string) {
    super(`
    Accessing user informaton is forbidden
    Attempted to access ${name}
    Trace: ${packageTrace.join("=>")}
    `);
  }
}
