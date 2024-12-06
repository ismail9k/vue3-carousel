
/** Useful function to destructure props without triggering reactivity for certain keys */
export function except<Obj extends object, Keys extends string>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> {
  return (Object.keys(obj).filter((k) => !(keys as string[]).includes(k)) as Array<Exclude<keyof Obj, Keys>>)
    .reduce((acc, key) => (acc[key] = obj[key], acc), {} as Omit<Obj, Keys>)
}