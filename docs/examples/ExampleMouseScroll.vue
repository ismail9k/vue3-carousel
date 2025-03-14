<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref } from 'vue'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/800/600?random=${index + 1}`,
}))

const threshold = ref(30)

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  mouseScroll: true,
  mouseScrollThreshold: threshold.value,
  wrapAround: true,
}

function updateThreshold(event) {
  threshold.value = Number(event.target.value)
  config.mouseScrollThreshold = threshold.value
}
</script>

<template>
  <div class="example-container">
    <h3>Mouse Scroll Navigation</h3>
    <p>Scroll your mouse wheel over the carousel to navigate through slides</p>

    <div class="threshold-control">
      <label for="threshold">Mouse Scroll Threshold: {{ threshold }}</label>
      <input
        id="threshold"
        type="range"
        min="10"
        max="100"
        step="10"
        v-model="threshold"
        @input="updateThreshold"
      />
      <small>Higher values require more scrolling (less sensitive)</small>
    </div>

    <Carousel v-bind="config">
      <Slide v-for="image in images" :key="image.id">
        <div class="carousel__item">
          <img :src="image.url" alt="image" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.example-container {
  text-align: center;
}

.threshold-control {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

input[type='range'] {
  width: 200px;
}

small {
  color: #888;
  font-size: 0.8em;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
