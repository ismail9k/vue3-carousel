import { inject, ref, h } from 'vue';

import { CarouselNav, VNode } from '../types';

const Pagination = () => {
  const slidesCount = inject('slidesCount', ref(1));
  const paginationCount = inject('paginationCount', ref(1));
  const currentSlide = inject('currentSlide', ref(1));
  const nav: CarouselNav = inject('nav', {});

  function handleButtonClick(slideNumber: number): void {
    nav.slideTo(slideNumber);
  }

  const children: Array<VNode> = [];
  for (let slide = 0; slide < paginationCount.value; slide++) {
    const button = h('button', {
      type: 'button',
      class: {
        'carousel__pagination-button': true,
        'carousel__pagination-button--active': currentSlide.value === slide,
      },
      onClick: () => handleButtonClick(slide),
    });
    const item = h('li', { class: 'carousel__pagination-item', key: slide }, button);
    children.push(item);
  }

  return h('ol', { class: 'carousel__pagination' }, children);
};

export default Pagination;
