export function getTransformValues(el: HTMLElement) {
  const { transform } = window.getComputedStyle(el)

  if (transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)') {
    return [1, 0, 0, 1, 0, 0]
  }

  const values = transform.match(/matrix\(([^)]+)\)/)
  if (!values) return [1, 0, 0, 1, 0, 0]
  
  return values[1].split(',').map(v => parseFloat(v.trim()))
}

export type ScaleMultipliers = {
  widthMultiplier: number
  heightMultiplier: number
}
export function getScaleMultipliers(
  transformElements: Set<HTMLElement>
): ScaleMultipliers {
  let widthMultiplier = 1
  let heightMultiplier = 1
  transformElements.forEach((el) => {
    const transformArr = getTransformValues(el)

    if (transformArr.length === 6) {
      widthMultiplier /= transformArr[0]
      heightMultiplier /= transformArr[3]
    }
  })

  return { widthMultiplier, heightMultiplier }
}
