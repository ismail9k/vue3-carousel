import { inject, h } from 'vue';

import Icon from './Icon';

import { CarouselNav } from '../types';

const Navigation = (props: any, { slots }: any) => {
  const { next: slotNext, prev: slotPrev } = slots;
  const nav: CarouselNav = inject('nav', {});

  const prevButton = h(
    'button',
    { class: 'carousel__prev', onClick: nav.prev },
    slotPrev?.() || h(Icon, { name: 'arrowLeft' })
  );
  const nextButton = h(
    'button',
    { class: 'carousel__next', onClick: nav.next },
    slotNext?.() || h(Icon, { name: 'arrowRight' })
  );

  return [prevButton, nextButton];
};

export default Navigation;
