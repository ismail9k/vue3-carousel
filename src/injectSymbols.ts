import { InjectionKey } from 'vue'

import { InjectedCarousel } from '@/components/Carousel'

// Use a symbol for inject provide to avoid any kind of collision with another lib
// https://vuejs.org/guide/components/provide-inject#working-with-symbol-keys
export const injectCarousel = Symbol('carousel') as InjectionKey<
  InjectedCarousel | undefined
>
