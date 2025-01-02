export function getTransformValues(el: HTMLElement) {
  const { transform } = window.getComputedStyle(el)

  //add sanity check
  return transform
    .split(/[(,)]/)
    .slice(1, -1)
    .map((v) => parseFloat(v))
}

export function getWidthMultiplier(transformElements: Set<HTMLElement>): number {
  let widthMultiplier = 1
  transformElements.forEach((el) => {
    const transformArr = getTransformValues(el)

    if (transformArr.length === 6) {
      widthMultiplier *= transformArr[0]
    }
  })

  return widthMultiplier
}
