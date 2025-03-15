/* eslint-disable */
// @ts-ignore
import ActiveClassesExampleRaw from './ExampleActiveClasses.vue?raw'
// @ts-ignore
import AutoplayExampleRaw from './ExampleAutoplay.vue?raw'
// @ts-ignore
import BasicExampleRaw from './ExampleBasic.vue?raw'
// @ts-ignore
import BreakpointsExampleRaw from './ExampleBreakpoints.vue?raw'
// @ts-ignore
import CustomNavigationExampleRaw from './ExampleCustomNavigation.vue?raw'
// @ts-ignore
import GalleryExampleRaw from './ExampleGallery.vue?raw'
// @ts-ignore
import MouseWheelExampleRaw from './ExampleMouseWheel.vue?raw'
// @ts-ignore
import VerticalExampleRaw from './ExampleVertical.vue?raw'
// @ts-ignore
import WrapAroundExampleRaw from './ExampleWrapAround.vue?raw'

function formatExample(exampleRaw: string) {
  return exampleRaw
    .replace('../../dist/carousel.css', 'vue3-carousel/carousel.css')
    .replace('../../dist/carousel.mjs', 'vue3-carousel')
}

export const BasicExample = formatExample(BasicExampleRaw)
export const WrapAroundExample = formatExample(WrapAroundExampleRaw)
export const VerticalExample = formatExample(VerticalExampleRaw)
export const BreakpointsExample = formatExample(BreakpointsExampleRaw)
export const AutoplayExample = formatExample(AutoplayExampleRaw)
export const ActiveClassesExample = formatExample(ActiveClassesExampleRaw)
export const CustomNavigationExample = formatExample(CustomNavigationExampleRaw)
export const GalleryExample = formatExample(GalleryExampleRaw)
export const MouseWheelExample = formatExample(MouseWheelExampleRaw)
