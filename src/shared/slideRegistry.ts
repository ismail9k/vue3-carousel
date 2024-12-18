import { ComponentInternalInstance, shallowReactive } from 'vue'

type SlideEventName = 'register' | 'unregister'

interface SlideRegistrationEvent {
  slide: ComponentInternalInstance
  index: number
}

type SlideRegistrationCallback = (event: SlideRegistrationEvent) => void

const createSlideRegistry = () => {
  const slides = shallowReactive<Array<ComponentInternalInstance>>([])
  const listeners: Record<SlideEventName, Set<SlideRegistrationCallback>> = {
    register: new Set(),
    unregister: new Set(),
  }

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

  const emit = (
    eventName: SlideEventName,
    slide: ComponentInternalInstance,
    index: number
  ) => {
    const eventListeners = listeners[eventName]
    if (!eventListeners) return

    const event: SlideRegistrationEvent = { slide, index }
    eventListeners.forEach((listener) => listener(event))
  }

  return {
    addEventListener: (
      eventName: SlideEventName,
      callback: SlideRegistrationCallback
    ) => {
      if (!listeners[eventName]) {
        listeners[eventName] = new Set()
      }
      listeners[eventName].add(callback)
    },

    removeEventListener: (
      eventName: SlideEventName,
      callback: SlideRegistrationCallback
    ) => {
      listeners[eventName]?.delete(callback)
    },

    registerSlide: (slide: ComponentInternalInstance) => {
      if (!slide) return

      const slideIndex = slides.length
      slides.push(slide)
      updateSlideIndexes(slideIndex)
      emit('register', slide, slideIndex)
    },

    unregisterSlide: (slide: ComponentInternalInstance) => {
      const slideIndex = slides.indexOf(slide)
      if (slideIndex === -1) return

      emit('unregister', slide, slideIndex)
      slides.splice(slideIndex, 1)
      updateSlideIndexes(slideIndex)
    },

    cleanup: () => {
      slides.splice(0, slides.length)
      Object.values(listeners).forEach((set) => set.clear())
    },

    getSlides: () => slides,
  }
}

export type SlideRegistry = ReturnType<typeof createSlideRegistry>

export { createSlideRegistry }
