import * as parser from "error-stack-parser";
import { getModulesFolder } from "./runtime";
import { uniq } from "./utils";

export function isNodeInternalCode(frame: parser.StackFrame) {
  return frame.fileName?.startsWith("node:internal");
}

function isUserCode(frame: parser.StackFrame) {
  return !isNodeInternalCode(frame);
}

function isNodeModules(frame: parser.StackFrame) {
  return frame.fileName?.includes(getModulesFolder() as string);
}

function cleanTrace(frames: parser.StackFrame[]) {
  return frames.filter((frame) => isUserCode(frame) && isNodeModules(frame));
}

export function extractPackageNameFromPath(path: string) {
  const segments = path.split("/").reverse();
  const index = segments.findIndex((segment) => segment === getModulesFolder());
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
  return frames.filter((frame) => !frame.fileName?.includes("hagana"));
}

export function getRawTrace() {
  Error.stackTraceLimit = Infinity;
  return parser.parse(new Error());
}

export function getInitiator() {
  const trace = getRawTrace();
  const fn = __filename;

  const cleaned = trace.filter((frame) => frame.fileName !== fn);
  return cleaned[0];
}

export function isNativeCode() {
  return getInitiator().fileName?.startsWith("node:internal");
}

export function getPackageTrace(): string[] {
  const frames = getRawTrace();

  return uniq(cleanTrace(frames).map(extractPackageName).reverse());
}
