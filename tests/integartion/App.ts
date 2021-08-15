import Carousel from '@/components/Carousel';
import Slide from '@/components/Slide';

import { defineComponent, h } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const slides = [1, 2, 3, 4, 5];
    return () =>
      h(
        Carousel,
        {},
        {
          slides() {
            return slides.map((item) => h(Slide, {}));
          },
        }
      );
  },
});
