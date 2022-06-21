const $String = String;
const $startsWith = $String.prototype.startsWith;
const $includes = $String.prototype.includes;
const $split = $String.prototype.split;

export function startsWith(
  targetString: string,
  searchString: string,
  position?: number | undefined
) {
  return $startsWith.call(targetString, searchString, position);
}

export function includes(
  targetString: string,
  searchString: string,
  position?: number | undefined
) {
  return $includes.call(targetString, searchString, position);
}

export function split(
  targetString: string,
  separator: any,
  limit?: number | undefined
) {
  return $split.call(targetString, separator, limit);
}
