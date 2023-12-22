type PartialNullish<T extends object> = {
  [K in keyof T]: T[K] extends null ? T[K] | undefined : T[K]
}

export default PartialNullish
