export function getSlidesToScroll({
  currentSlide,
  snapAlign,
  itemsToShow,
  wrapAround,
  slidesCount,
}: {
  currentSlide: number
  itemsToShow: number
  wrapAround: boolean
  slidesCount: number
  snapAlign: string
}): number {
  let output = currentSlide

  if (snapAlign === 'center' || snapAlign === 'center-odd') {
    output -= (itemsToShow - 1) / 2
  } else if (snapAlign === 'center-even') {
    output -= (itemsToShow - 2) / 2
  } else if (snapAlign === 'end') {
    output -= itemsToShow - 1
  }

  if (!wrapAround) {
    const max = slidesCount - itemsToShow
    const min = 0
    output = Math.max(Math.min(output, max), min)
  }

  return output
}
