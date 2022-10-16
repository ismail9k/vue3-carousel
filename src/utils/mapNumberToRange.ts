export function mapNumberToRange(current: number, max: number, min = 0): number {
  if (current > max) {
    return mapNumberToRange(current - (max + 1), max, min)
  }
  if (current < min) {
    return mapNumberToRange(current + (max + 1), max, min)
  }
  return current
}
