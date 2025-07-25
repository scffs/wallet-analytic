export const withCatch = <T>(
  fn: () => T,
): [result: T] | [undefined, unknown] => {
  try {
    const res = fn()
    return [res]
  } catch (e) {
    console.log('withCatch error', e)
    return [undefined, e]
  }
}
