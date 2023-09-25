export default function handleException<
  C extends `${string}-${number}`,
  D extends object = object,
>(code: C, message: string, detail?: D) {
  return {
    code,
    message,
    detail,
  };
}
