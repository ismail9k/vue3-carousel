import { defineComponent, inject, ref, computed, watchEffect, h, reactive } from 'vue';

import { Counter } from '../partials/counter';

import { SetupContext, CarouselConfig, Ref, ElementStyleObject } from '../types';

export default defineComponent({
  name: 'CarouselSlide',
  props: {
    index: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }: SetupContext) {
    const config: CarouselConfig = inject('config', reactive({}));
    const slidesBuffer: Ref<Array<number>> = inject('slidesBuffer', ref([]));
    const slidesCounter = inject('slidesCounter') as Counter;
    const currentSlide = inject('currentSlide', ref(0));
    const slidesToScroll = inject('slidesToScroll', ref(0));

    const slideOrder: number = slidesCounter.value;
    const wrapOrder: Ref<number> = ref(slideOrder);

    if (config.wrapAround) {
      updateOrder();
      watchEffect(updateOrder);
    }

    function updateOrder(): void {
      wrapOrder.value = slidesBuffer.value.indexOf(slideOrder);
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

    const isActive = (): boolean => props.index === currentSlide.value;
    const isVisible = (): boolean => {
      const min = Math.ceil(slidesToScroll.value);
      const max = Math.floor(slidesToScroll.value + config.itemsToShow);
      const current = slidesBuffer.value.slice(min, max);

      return current.includes(props.index);
    };
    const isPrev = (): boolean =>
      props.index === slidesBuffer.value[Math.ceil(slidesToScroll.value) - 1];
    const isNext = (): boolean =>
      props.index ===
      slidesBuffer.value[Math.floor(slidesToScroll.value + config.itemsToShow)];
    return () =>
      h(
        'li',
        {
          style: slideStyle.value,
          class: {
            carousel__slide: true,
            'carousel__slide--active': isActive(),
            'carousel__slide--visible': isVisible(),
            'carousel__slide--prev': isPrev(),
            'carousel__slide--next': isNext(),
          },
        },
        slots.default?.()
      );
  },
});
