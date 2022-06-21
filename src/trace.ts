import * as parser from "error-stack-parser";
import { filter, findIndex, map, reverse } from "./natives/$array";
import { $Error } from "./natives/$error";
import { includes, split, startsWith } from "./natives/$string";
import { getModulesFolder } from "./runtime";
import { uniq } from "./utils";

export function isNodeInternalCode(frame: parser.StackFrame) {
  if (!frame.fileName) return false;
  return startsWith(frame.fileName, "node:internal");
}

function isUserCode(frame: parser.StackFrame) {
  return !isNodeInternalCode(frame);
}

function isNodeModules(frame: parser.StackFrame) {
  if (!frame.fileName) return false;
  return includes(frame.fileName, getModulesFolder());
}

function cleanTrace(frames: parser.StackFrame[]) {
  return filter(frames, (frame) => isUserCode(frame) && isNodeModules(frame));
}

export function extractPackageNameFromPath(path: string) {
  const segments = reverse(split(path, "/"));
  const index = findIndex(
    segments,
    (segment) => segment === getModulesFolder()
  );
  if (index > -1 && segments[index - 1]) {
    return segments[index - 1];
  }

  return "";
}

export function extractPackageName(frame: parser.StackFrame) {
  if (frame.fileName) {
    return extractPackageNameFromPath(frame.fileName);
  }

  return "";
}

export function removeHaganaFrames(frames: parser.StackFrame[]) {
  return filter(
    frames,
    (frame) => !includes(frame.fileName as string, "hagana")
  );
}

export function getRawTrace() {
  $Error.stackTraceLimit = Infinity;
  return parser.parse(new $Error());
}

export function getInitiator() {
  const trace = getRawTrace();
  const fn = __filename;

  const cleaned = filter(trace, (frame) => frame.fileName !== fn);
  return cleaned[0];
}

export function isNativeCode() {
  return startsWith(getInitiator().fileName as string, "node:internal");
}

export function getPackageTrace(): string[] {
  const frames = getRawTrace();

  const trace: string[] = uniq(
    reverse(map(cleanTrace(frames), extractPackageName))
  );

  return trace;
}
