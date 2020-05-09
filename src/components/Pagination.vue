<template functional>
  <ol class="carousel__pagination">
    <li
      class="carousel__pagination-item"
      v-for="(_, slide) in slidesCount"
      :key="slide"
    >
      <button
        class="carousel__pagination-button"
        :class="{
          'carousel__pagination-button--active': currentSlide === slide,
        }"
        @click="handleButtonClick(slide)"
      ></button>
    </li>
  </ol>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  name: 'Pagination',
  setup(props, { emit }) {
    const slidesCount = inject('slidesCount', ref(0));
    const currentSlide = inject('currentSlide', ref(1));

    function handleButtonClick(slideNumber) {
      emit('slide', slideNumber);
    }

    return {
      slidesCount,
      currentSlide,
      handleButtonClick,
    };
  },
});
</script>

<style>
.carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
}
.carousel__pagination-button {
  margin: 5px;
  width: 10px;
  height: 5px;
  border: 0;
  cursor: pointer;
  background-color: #8e98f3;
}

.carousel__pagination-button--active {
  background-color: #642afb;
}
</style>
