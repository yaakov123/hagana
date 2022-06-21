import path from "path";

const $path = path;
const $relative = path.relative;
const $isAbsolute = path.isAbsolute;

export function relative(from: string, to: string) {
  return $relative.call($path, from, to);
}

export function isAbsolute(p: string) {
  return $isAbsolute.call($path, p);
}
