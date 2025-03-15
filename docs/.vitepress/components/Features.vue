<script setup>
import { Carousel, Navigation, Slide as CarouselSlide } from '../../../dist/carousel.mjs'
import '../../../dist/carousel.css'

const config = {
  snapAlign: 'start',
  wrapAround: true,
  transition: 500,
  autoplay: 7000,
  gap: 32,
  breakpoints: {
    960: {
      itemsToShow: 3,
      gap: 32,
    },
    640: {
      enabled: true,
      itemsToShow: 2,
      gap: 16,
    },
    0: {
      enabled: false,
    },
  },
}

const features = [
  {
    icon: '🧁',
    title: 'Vue.js',
    details: 'Optimized to work with Vue 3 framework, not a wrapper for another library.',
  },
  {
    icon: '♿',
    title: 'Accessible',
    details:
      'Robust structure with accessibility in mind Touch, Keyboard, Mouse Wheel, and Navigation support.',
  },
  {
    icon: '📱',
    title: 'Responsive',
    details:
      'Responsive breakpoints, to apply custom configurations for each screen size.',
  },
  {
    icon: '🔄',
    title: 'Infinite Loop',
    details:
      'Optional wrap-around mode with smooth transition for endless scrolling experience.',
  },
  {
    icon: '⚡',
    title: 'Auto-resize',
    details:
      'Smart slide size calculation that automatically adapts to viewport changes and animations.',
  },
  {
    icon: '🎮',
    title: 'Touch & Drag',
    details:
      'Smooth touch and mouse drag support with intuitive gesture controls and momentum.',
  },
]
</script>

<template>
  <section class="features">
    <div class="container">
      <Carousel v-bind="config">
        <CarouselSlide v-for="feature in features" :key="feature.title">
          <div class="box">
            <div class="icon">{{ feature.icon }}</div>
            <h3 class="title">{{ feature.title }}</h3>
            <p class="details">{{ feature.details }}</p>
          </div>
        </CarouselSlide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style>
.features {
  margin: 0 auto;
  max-width: 1152px;
}

.box {
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    border-color 0.25s,
    background-color 0.25s;

  @media screen and (max-width: 640px) {
    margin-bottom: 16px;
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 0;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin: 0;
}
.carousel__prev {
  left: -60px;
}
.carousel__next {
  right: -60px;
}
.dark {
  .carousel__next,
  .carousel__prev {
    --vc-nav-color: #fff;
    --vc-nav-width: 50px;
    --vc-nav-height: 50px;
  }
}
</style>
