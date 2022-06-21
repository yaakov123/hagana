const $Object = Object;

const $hasOwnProperty = $Object.prototype.hasOwnProperty;

export function hasOwnProperty(obj: object, v: PropertyKey) {
  return $hasOwnProperty.call(obj, v);
}
