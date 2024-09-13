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
  breakpointsToContainer: false,
  i18n: {
    ariaNextSlide: 'Navigate to next slide',
    ariaPreviousSlide: 'Navigate to previous slide',
    ariaNavigateToSlide: 'Navigate to slide {slideNumber}',
    ariaGallery: 'Gallery',
    itemXofY: 'Item {currentSlide} of {slidesCount}',
    iconArrowUp: 'Arrow pointing upwards',
    iconArrowDown: 'Arrow pointing downwards',
    iconArrowRight: 'Arrow pointing to the right',
    iconArrowLeft: 'Arrow pointing to the left',
  },
}
