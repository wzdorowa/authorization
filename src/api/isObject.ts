function isObject(value: any): value is object & Record<keyof any, unknown> {
  return typeof value === 'object';
}

export default isObject;
