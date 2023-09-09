export default function suppressError<F extends (...args: any[]) => any>(
  func: F,
  defaultReturnValue?: ReturnType<F>
) {
  try {
    return func();
  } catch {
    return defaultReturnValue;
  }
}
