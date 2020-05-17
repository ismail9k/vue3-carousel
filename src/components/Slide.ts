import { defineComponent, inject, ref, computed, watchEffect, h, reactive } from 'vue';

import slidesCounter from '../partials/counter';

import { SetupContext, CarouselConfig, Ref, ElementStyleObject } from '../types';

export default defineComponent({
  name: 'CarouselSlide',
  props: {
    order: {
      type: Number,
      default: 1,
    },
  },
  setup(_, { slots }: SetupContext) {
    const config: CarouselConfig = inject('config', reactive({}));
    const slidesBuffer: Ref<Array<number>> = inject('slidesBuffer', ref([]));

    const slideOrder: Ref<number> = ref(slidesCounter.value);
    const wrapOrder: Ref<number> = ref(slideOrder.value);

    if (config.wrapAround) {
      updateOrder();
      watchEffect(updateOrder);
    }

    const slideStyle = computed(
      (): ElementStyleObject => {
        const items = config.itemsToShow;
        const width = `${(1 / items) * 100}%`;
        return {
          width,
          order: wrapOrder.value.toString(),
        };
      }
    );

    function updateOrder(): void {
      wrapOrder.value = slidesBuffer.value.indexOf(slideOrder.value);
    }

    return () => h('li', { style: slideStyle, class: 'carousel__slide' }, slots.default);
  },
});
