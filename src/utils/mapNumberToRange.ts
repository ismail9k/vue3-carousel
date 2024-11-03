type Args = {
  val: number
  max: number
  min?: number
}

export function mapNumberToRange({ val, max, min = 0 }: Args): number {
  const mod = max + 1;
  return ((val - min) % mod + mod) % mod + min
}
