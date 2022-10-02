import { defineComponent, inject, ref, h } from 'vue'

export default defineComponent({
  name: 'ARIA',
  setup() {
    const currentSlide = inject('currentSlide', ref(0))
    const slidesCount = inject('slidesCount', ref(0))

    return () =>
      h(
        'div',
        {
          class: ['carousel__liveregion', 'carousel__sr-only'],
          'aria-live': 'polite',
          'aria-atomic': 'true',
        },
        `Item ${currentSlide.value + 1} of ${slidesCount.value}`
      )
  },
})
