# Test

## Basic

<ExampleBasic />

## Wrap Around

<ExampleWrapAround />

## Breakpoints

<ExampleBreakpoints />

## Autoplay

<ExampleAutoPlay />

## Active Classes

<ExampleActiveClasses />

## Custom Navigation

<ExampleCustomNavigation />

## Gallery

<ExampleGallery />

<script>
import ExampleBasic from './examples/ExampleBasic.vue';
import ExampleWrapAround from './examples/ExampleWrapAround.vue';
import ExampleBreakpoints from './examples/ExampleBreakpoints.vue';
import ExampleAutoPlay from './examples/ExampleAutoPlay.vue';
import ExampleActiveClasses from './examples/ExampleActiveClasses.vue';
import ExampleCustomNavigation from './examples/ExampleCustomNavigation.vue';
import ExampleGallery from './examples/ExampleGallery.vue';

export default {
  components: {
    ExampleBasic,
    ExampleWrapAround,
    ExampleBreakpoints,
    ExampleAutoPlay,
    ExampleActiveClasses,
    ExampleCustomNavigation,
    ExampleGallery,
  }
}
</script>

<style>
:root {
  --brand-color: #535bf2;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--brand-color);
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 1px;
}

.carousel__pagination {
  list-style: none !important;
}

.carousel__pagination-item {
  margin-top: 0 !important;
}

.carousel__slide {
  margin-top: 0 !important;
}
</style>