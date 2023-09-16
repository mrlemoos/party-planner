type ArrayItem<T> = T extends Array<infer F> ? F : never;

export default ArrayItem;