export const $Proxy = Proxy;
const $Reflect = Reflect;
const $reflectApply = $Reflect.apply;

export function reflectApply(
  target: Function,
  thisArgument: any,
  argumentsList: ArrayLike<any>
) {
  return $reflectApply.call($Reflect, target, thisArgument, argumentsList);
}
