<template>
  <button class="carousel__prev" @click="handlePrevClick">
    <slot name="prevIcon">
      <icon name="arrowLeft" />
    </slot>
  </button>
  <button class="carousel__next" @click="handleNextClick">
    <slot name="nextIcon">
      <icon name="arrowRight" />
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

import Icon from './Icon.vue';

import { Data, SetupContext } from 'vue/types';

export default defineComponent({
  name: 'Navigation',
  components: {
    Icon,
  },
  setup(props: Data, { emit }: SetupContext): Data {
    const nav = inject('nav');

    function handleNextClick(): void {
      nav.next();
      emit('next');
    }
    function handlePrevClick(): void {
      nav.prev();
      emit('prev');
    }

    return {
      handleNextClick,
      handlePrevClick,
    };
  },
});
</script>
