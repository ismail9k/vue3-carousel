type Args = {
  val: number
  max: number
  min: number
}

export function getNumberInRange({ val, max, min }: Args): number {
  if (max < min) {
    return val
  }
  return Math.min(Math.max(val, min), max)
}
