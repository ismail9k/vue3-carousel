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
  labels: {
    ariaNextSlide: 'Navigate to next slide',
    ariaPreviousSlide: 'Navigate to previous slide',
    ariaNavigateToSlide: 'Navigate to slide',
    ariaGallery: 'Gallery',
    itemXofY: `Item \${0} of \${1}`,
    iconAriaLabels: {
      arrowUp: 'Arrow pointing upwards',
      arrowDown: 'Arrow pointing downwards',
      arrowRight: 'Arrow pointing to the right',
      arrowLeft: 'Arrow pointing to the left',
    },
  },
}
