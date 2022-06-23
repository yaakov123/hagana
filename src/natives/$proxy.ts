export const $Proxy = Proxy;
const $Reflect = Reflect;
const $reflectApply = $Reflect.apply;
const $reflectConstruct = $Reflect.construct;

export function reflectApply(
  target: Function,
  thisArgument: any,
  argumentsList: ArrayLike<any>
) {
  return $reflectApply.call($Reflect, target, thisArgument, argumentsList);
}

export function reflectConstruct(
  target: Function,
  argumentsList: ArrayLike<any>,
  newTarget: Function
) {
  return $reflectConstruct.call($Reflect, target, argumentsList, newTarget);
}
