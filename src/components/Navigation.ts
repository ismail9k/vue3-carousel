import { defineComponent, inject, h } from 'vue';

import Icon from './Icon';

import { SetupContext, CarouselNav } from '../types';

export default defineComponent({
  name: 'Navigation',
  setup(_, { emit }: SetupContext) {
    const nav: CarouselNav = inject('nav', {});

    function handleNextClick(): void {
      nav.next();
      emit('next');
    }
    function handlePrevClick(): void {
      nav.prev();
      emit('prev');
    }

    const prevButton = h(
      'button',
      { class: 'carousel__prev', onClick: handlePrevClick },
      h(Icon, { name: 'arrowLeft' })
    );
    const nextButton = h(
      'button',
      { class: 'carousel__next', onClick: handleNextClick },
      h(Icon, { name: 'arrowRight' })
    );
    return () => h('div', [prevButton, nextButton]);
  },
});
