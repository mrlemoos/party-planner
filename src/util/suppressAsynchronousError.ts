export default async function suppressAsynchronousError<F extends (...args: any[]) => Promise<any>>(
  func: F,
  defaultReturnValue?: ReturnType<Awaited<F>>
) {
  try {
    return await func();
  } catch (error) {
    console.error(`An error occurred and was suppressed by suppressAsynchronousError(): ${error}`);
    return defaultReturnValue;
  }
}
