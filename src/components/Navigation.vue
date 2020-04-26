<template>
  <ol class="carousel__navigation">
    <li
      class="carousel__navigation-item"
      v-for="slide in slidesCount"
      :key="slide"
    >
      <button
        class="carousel__navigation-button"
        :class="{
          'carousel__navigation-button--active': currentSlide === slide,
        }"
        @click="slideTo(slide)"
      ></button>
    </li>
  </ol>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const slidesCount = inject('slidesCount', ref(0));
    const currentSlide = inject('currentSlide', ref(1));

    function slideTo(slideNumber) {
      emit('slide', slideNumber);
    }

    return {
      slidesCount,
      currentSlide,
      slideTo,
    };
  },
});
</script>

<style>
.carousel__navigation {
  display: flex;
  justify-content: center;
  list-style: none;
}
.carousel__navigation-button {
  margin: 5px;
  width: 10px;
  height: 5px;
  border: 0;
  cursor: pointer;
  background-color: #8e98f3;
}

.carousel__navigation-button--active {
  background-color: #642afb;
}
</style>
