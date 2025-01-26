export const examples: Record<string, { code: string; styles: string }> = {
  basic: {
    code: `
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
};
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  wrapAround: {
    code: `
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  wrapAround: true,
};
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  vertical: {
    code: `
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const carouselConfig = {
  dir: 'ttb',
  wrapAround: true,
  itemsToShow: 2,
  snapAlign: 'center',
  height: '400px',
  gap: 5,
};

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="img in images" :key="img.id">
        <img :src="img.url" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel__slide {
  border-radius: 8px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  breakpoints: {
    code: `
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

// Carousel configuration
const config = {
  height: 200,
  itemsToShow: 1,
  gap: 5,
  snapAlign: 'center',

  // 'breakpointMode' determines how the carousel breakpoints are calculated
  // Acceptable values: 'viewport' (default) | 'carousel'
  // 'viewport' - breakpoints are based on the viewport width
  // 'carousel' - breakpoints are based on the carousel width
  breakpointMode: 'carousel',

  // Breakpoints are mobile-first
  // Any settings not specified will fall back to the carousel's default settings
  breakpoints: {
    // 300px and up
    300: {
      itemsToShow: 2,
      snapAlign: 'center',
    },
    // 400px and up
    400: {
      itemsToShow: 3,
      snapAlign: 'start',
    },
    // 500px and up
    500: {
      itemsToShow: 4,
      snapAlign: 'start',
    },
  },
};
</script>

<template>
  <!-- Resizable container for testing 'carousel' breakpointMode -->
  <!-- Drag the right edge to adjust the width and see the breakpoints change -->
  <div class="carousel__wrapper">
    <Carousel v-bind="config">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__wrapper {
  resize: horizontal;
  border: 2px dashed gray;
  overflow: auto;
  max-width: 688px;
  padding: 2px;
}
`.trimStart(),
  },
  autoplay: {
    code: `
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  autoplay: 4000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  activeClasses: {
    code: `
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const carouselConfig = {
  height: 200,
  itemsToShow: 3.5,
  wrapAround: true,
};
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  customNavigation: {
    code: `
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

const carouselRef = ref();
const currentSlide = ref(1);

const next = () => carouselRef.value.next();
const prev = () => carouselRef.value.prev();

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
};
</script>

<template>
  <Carousel ref="carouselRef" v-model="currentSlide" v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>
  </Carousel>

  <div>
    <button @click="prev">Prev</button>
    <input type="number" min="0" max="9" v-model="currentSlide" />
    <button @click="next">Next</button>
  </div>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`.trimStart(),
  },
  gallery: {
    code: `
<script setup>
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import { ref } from 'vue';

const currentSlide = ref(0);

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
  height: 320,
};

const thumbnailsConfig = {
  height: 80,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: false,
  gap: 10,
};

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: \`https://picsum.photos/800/600?random=\${index + 1}\`,
}));
</script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="Gallery Image" class="gallery-image" />
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="image in images" :key="image.id">
      <template #default="{ currentIndex, isActive }">
        <div
          :class="['thumbnail', { 'is-active': isActive }]"
          @click="slideTo(currentIndex)"
        >
          <img :src="image.url" alt="Thumbnail Image" class="thumbnail-image" />
        </div>
      </template>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
`.trimStart(),
    styles: `
:root {
  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-image {
  border-radius: 16px;
}

#thumbnails {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
}

.thumbnail.is-active,
.thumbnail:hover {
  opacity: 1;
}
`.trimStart(),
  },
}
