/**
 * Suppresses an error thrown by a function and returns a default value instead.
 */
function suppressError<F extends (...args: any[]) => any, T = ReturnType<F>>(
  func: F,
  defaultReturnValue?: T,
) {
  try {
    return func();
  } catch {
    return defaultReturnValue;
  }
}

export default suppressError;
