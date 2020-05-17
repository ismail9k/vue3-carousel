import { defineComponent, inject, ref, h } from 'vue';

import { SetupContext, CarouselNav, VNode } from '../types';

export default defineComponent({
  name: 'Pagination',
  setup(_, { emit }: SetupContext) {
    const slidesCount = inject('slidesCount', ref(0));
    const currentSlide = inject('currentSlide', ref(1));
    const nav: CarouselNav = inject('nav', {});

    function handleButtonClick(slideNumber: number): void {
      nav.slideTo(slideNumber);
      emit('slide', slideNumber);
    }

    const children: Array<VNode> = [];
    for (let slide = 0; slide < slidesCount.value; slide++) {
      const button = h('button', {
        class: {
          'carousel__pagination-button': true,
          'carousel__pagination-button--active': currentSlide.value === slide,
        },
        nativeOn: {
          click: () => handleButtonClick(slide),
        },
      });
      const item = h('li', { class: 'carousel__pagination-item', key: slide }, button);
      children.push(item);
    }
    return () => h('ol', { class: 'carousel__pagination' }, children);
  },
});
