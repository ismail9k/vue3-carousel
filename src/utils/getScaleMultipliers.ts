export function getTransformValues(el: HTMLElement) {
  const { transform } = window.getComputedStyle(el)

  //add sanity check
  return transform
    .split(/[(,)]/)
    .slice(1, -1)
    .map((v) => parseFloat(v))
}

export function getScaleMultipliers(transformElements: Set<HTMLElement>): {
  widthMultiplier: number
  heightMultiplier: number
} {
  let widthMultiplier = 1
  let heightMultiplier = 1
  transformElements.forEach((el) => {
    const transformArr = getTransformValues(el)

    if (transformArr.length === 6) {
      widthMultiplier *= transformArr[0]
      heightMultiplier *= transformArr[3]
    }
  })

  return { widthMultiplier, heightMultiplier }
}
