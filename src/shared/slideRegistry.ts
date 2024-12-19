import { ComponentInternalInstance, EmitFn, shallowReactive } from 'vue'

const createSlideRegistry = (emit: EmitFn) => {
  const slides = shallowReactive<Array<ComponentInternalInstance>>([])

  const updateSlideIndexes = (startIndex?: number) => {
    if (startIndex !== undefined) {
      // Update only slides from startIndex onwards
      slides.slice(startIndex).forEach((slide, offset) => {
        slide.props.index = startIndex + offset
      })
    } else {
      // Update all slides
      slides.forEach((slide, index) => {
        slide.props.index = index
      })
    }
  }

  return {
    registerSlide: (slide: ComponentInternalInstance) => {
      if (!slide) return

      const slideIndex = slides.length
      slides.push(slide)
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
