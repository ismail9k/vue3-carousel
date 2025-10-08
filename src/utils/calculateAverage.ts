export function calculateAverage(numbers: number[]) {
  if (numbers.length === 0) return 0
  const validNumbers = numbers.filter(num => typeof num === 'number' && !isNaN(num) && isFinite(num))
  if (validNumbers.length === 0) return 0
  const sum = validNumbers.reduce((acc, num) => acc + num, 0)
  return sum / validNumbers.length
}
