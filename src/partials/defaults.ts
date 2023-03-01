import { CarouselConfig } from '../types'

export const defaultConfigs: CarouselConfig = {
  itemsToShow: 1,
  itemsToScroll: 1,
  modelValue: 0,
  transition: 300,
  autoplay: 0,
  snapAlign: 'center',
  wrapAround: false,
  throttle: 16,
  pauseAutoplayOnHover: false,
  mouseDrag: true,
  touchDrag: true,
  dir: 'ltr',
  breakpoints: undefined,
}
