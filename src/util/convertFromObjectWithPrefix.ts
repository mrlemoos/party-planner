export default function convertFromObjectWithPrefix<T>(object: any, prefix: string): T {
  const convertedObject = {} as T;

  Object.keys(object).forEach((key) => {
    if (!key.startsWith(prefix)) return;

    const value = object[key];
    const convertedKey = key.replace(prefix, "") as keyof typeof convertedObject;

    convertedObject[convertedKey as keyof T] = value;
  });

  return convertedObject;
}
