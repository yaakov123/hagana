const fdToPathMap: Record<number, string> = {};

export function setFdToPath(fd: number, path: string) {
  fdToPathMap[fd] = path;
}

export function getPathFromFd(fd: number) {
  return fdToPathMap[fd];
}
