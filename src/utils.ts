import { filter } from "./natives/$array";
import { hasOwnProperty } from "./natives/$object";

export function uniq(a: any[]) {
  const seen: any = {};
  return filter(a, function (item) {
    return hasOwnProperty(seen, item) ? false : (seen[item] = true);
  });
}
