import { defineComponent, inject, h } from 'vue';

import Icon from './Icon';

import { Data, SetupContext, CarouselNav } from '../types';

export default defineComponent({
  name: 'Navigation',
  components: {
    Icon,
  },
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
      { class: 'carousel__prev', nativeOn: { click: handlePrevClick } },
      h(Icon, { props: { name: 'arrowLeft' } })
    );
    const nextButton = h(
      'button',
      { class: 'carousel__next', nativeOn: { click: handleNextClick } },
      h(Icon, { props: { name: 'arrowRight' } })
    );
    return () => h('div', {}, [prevButton, nextButton]);
  },
});
