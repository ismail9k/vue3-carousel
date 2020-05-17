import { defineComponent, h } from 'vue';

import icons from '../partials/icons';

import { Data } from '../types';

export default defineComponent({
  name: 'Icon',
  props: { name: String, title: String },
  setup(props: Data) {
    const iconName = props.name;
    if (!iconName || typeof iconName !== 'string') {
      return;
    }
    const path = icons[iconName];
    const pathEl = h('path', { attrs: { d: path } });

    const iconTitle = props.title || iconName;
    const titleEl = h('title', null, iconName);

    return () =>
      h(
        'svg',
        {
          class: 'carousel__icon',
          attrs: { viewBox: '0 0 24 24', role: 'img' },
        },
        [titleEl, pathEl]
      );
  },
});
