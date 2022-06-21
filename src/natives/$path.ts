import path from "path";

const $path = path;
const $relative = path.relative;
const $isAbsolute = path.isAbsolute;

function relative(from: string, to: string) {
  return $relative.call($path, from, to);
}

function isAbsolute(p: string) {
  return $isAbsolute.call($path, p);
}

export { relative, isAbsolute };
