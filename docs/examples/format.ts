export function formatExample(exampleRaw: string): string {
  return exampleRaw
    .replace('../../dist/carousel.css', 'vue3-carousel/carousel.css')
    .replace('../../dist/carousel.mjs', 'vue3-carousel')
}
