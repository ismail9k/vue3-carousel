type MapNumberToRangeArgs = {
  val: number
  max: number
  min?: number
}

export function mapNumberToRange({ val, max, min = 0 }: MapNumberToRangeArgs): number {
  const mod = max - min + 1
  return ((((val - min) % mod) + mod) % mod) + min
}
