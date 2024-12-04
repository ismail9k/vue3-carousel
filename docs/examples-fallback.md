# Examples

## Basic

A simple implementation of the carousel with default settings.

<ExampleBasic />

## Wrap Around

Demonstrates a carousel with continuous wrap-around functionality.

<ExampleWrapAround />

## Vertical

Showcases a vertically scrolling carousel. Adjust the height to better fit your content.

<ExampleVertical />

## Breakpoints

An example of a responsive carousel with breakpoints for varying screen sizes.

<ExampleBreakpoints />

## Autoplay

Illustrates the carousel with autoplay functionality enabled.

<ExampleAutoplay />

## Active Classes

An example highlighting active items with custom classes.

<ExampleActiveClasses />

## Disabled

A demonstration of how to disable the carousel.

<ExampleDisable />

## Custom Navigation

A demonstration of the carousel with fully customizable navigation controls.

<ExampleCustomNavigation />

## Gallery

Transforms the carousel into a gallery-style component.

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
  margin: 0 !important;
}
</style>