import { inject, h } from 'vue';

import Icon from './Icon';

import { CarouselNav } from '../types';

const Navigation = () => {
  const nav: CarouselNav = inject('nav', {});

  const prevButton = h(
    'button',
    { class: 'carousel__prev', onClick: nav.prev },
    h(Icon, { name: 'arrowLeft' })
  );
  const nextButton = h(
    'button',
    { class: 'carousel__next', onClick: nav.next },
    h(Icon, { name: 'arrowRight' })
  );

  return h('div', [prevButton, nextButton]);
};

export default Navigation;
