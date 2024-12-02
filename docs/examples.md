# Examples

If you're experiencing issues loading the live examples or you're browsing on a mobile device, visit the [Fallback Examples Page](/examples-fallback) for a better experience.

## Basic

A simple implementation of the carousel with default settings.

<Example id="vue3-carousel-example-basic" />

## Wrap Around

Demonstrates a carousel with continuous wrap-around functionality.

<Example id="vue3-carousel-example-wrap-around" />

## Vertical

Showcases a vertically scrolling carousel. Adjust the height to better fit your content.

<Example id="vue3-carousel-example-vertical" :height="475" />

## Breakpoints

An example of a responsive carousel with breakpoints for varying screen sizes.

<Example id="vue3-carousel-example-breakpoints" :height="300" />

## Autoplay

Illustrates the carousel with autoplay functionality enabled.

<Example id="vue3-carousel-example-autoplay" />

## Active Classes

An example highlighting active items with custom classes.

<Example id="vue3-carousel-example-status-classes" />

## Custom Navigation

A demonstration of the carousel with fully customizable navigation controls.

<Example id="vue3-carousel-example-custom-navigation" :height="310" />

## Gallery

Transforms the carousel into a gallery-style component.

<Example id="vue3-carousel-example-gallery" :height="500" />

<script>
import Example from './.vitepress/components/Example.vue';
export default {
  components: {
    Example,
  },
};
</script>
