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

<script>
import { defineComponent, inject } from 'vue';

import Icon from './Icon.vue';

export default defineComponent({
  name: 'Navigation',
  components: {
    Icon,
  },
  setup(props, { emit }) {
    const nav = inject('nav');

    function handleNextClick() {
      nav.next();
      emit('next');
    }
    function handlePrevClick() {
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

<style>
.carousel__prev,
.carousel__next {
  background-color: #642afb;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 20px;
  padding: 0;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 0;
  cursor: pointer;
}

.carousel__prev {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

.carousel__next {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
}
</style>
