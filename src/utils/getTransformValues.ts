export function getTransformValues(el: HTMLElement) {
  const { transform } = window.getComputedStyle(el)

  //add sanity check
  return transform
    .split(/[(,)]/)
    .slice(1, -1)
    .map((v) => parseFloat(v))
}
