# Test

## Basic

<ExampleBasic />

## Wrap Around

<ExampleWrapAround />

## Vertical

<ExampleVertical />

## Breakpoints

<ExampleBreakpoints />

## Autoplay

<ExampleAutoplay />

## Active Classes

<ExampleActiveClasses />

## Disabled

<ExampleDisable />

## Custom Navigation

<ExampleCustomNavigation />

## Gallery

<ExampleGallery />

<script setup>
import ExampleBasic from './examples/ExampleBasic.vue';
import ExampleWrapAround from './examples/ExampleWrapAround.vue';
import ExampleBreakpoints from './examples/ExampleBreakpoints.vue';
import ExampleAutoplay from './examples/ExampleAutoplay.vue';
import ExampleActiveClasses from './examples/ExampleActiveClasses.vue';
import ExampleCustomNavigation from './examples/ExampleCustomNavigation.vue';
import ExampleGallery from './examples/ExampleGallery.vue';
import ExampleVertical from './examples/ExampleVertical.vue';
import ExampleDisable from './examples/ExampleDisable.vue';
</script>

<style>
:root {
  --brand-color: #535bf2;
}

.carousel__track {
  min-height: 200px
}

.carousel__item {
  height: 100%;
  width: 100%;
  background-color: var(--brand-color);
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vp-doc ol,
.vp-doc li + li {
  margin: 0;
}

.carousel__pagination {
  margin: 10px 0 0 !important;
}
</style>