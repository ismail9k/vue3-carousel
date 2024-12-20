import { ComponentInternalInstance, EmitFn, shallowReactive } from 'vue'

const createSlideRegistry = (emit: EmitFn) => {
  const slides = shallowReactive<Array<ComponentInternalInstance>>([])

  const updateSlideIndexes = (startIndex?: number) => {
    if (startIndex !== undefined) {
      slides.slice(startIndex).forEach((slide, offset) => {
        slide.exposed?.setIndex(startIndex + offset)
      })
    } else {
      slides.forEach((slide, index) => {
        slide.exposed?.setIndex(index)
      })
    }
  }

  return {
    registerSlide: (slide: ComponentInternalInstance, index?: number) => {
      if (!slide) return

      const slideIndex = index ?? slides.length
      slides.splice(slideIndex, 0, slide)
      updateSlideIndexes(slideIndex)
      emit('slide-registered', { slide, index: slideIndex })
    },

    unregisterSlide: (slide: ComponentInternalInstance) => {
      const slideIndex = slides.indexOf(slide)
      if (slideIndex === -1) return

      emit('slide-unregistered', { slide, index: slideIndex })

      slides.splice(slideIndex, 1)
      updateSlideIndexes(slideIndex)
    },

    cleanup: () => {
      slides.splice(0, slides.length)
    },

    getSlides: () => slides,
  }
}

export type SlideRegistry = ReturnType<typeof createSlideRegistry>

export { createSlideRegistry }
