type Args = {
  val: number
  max: number
  min?: number
}

export function mapNumberToRange({ val, max, min = 0 }: Args): number {
  if (val > max) {
    return mapNumberToRange({ val: val - (max + 1), max, min })
  }
  if (val < min) {
    return mapNumberToRange({ val: val + (max + 1), max, min })
  }
  return val
}
