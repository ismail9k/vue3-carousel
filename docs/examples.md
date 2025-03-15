# Examples

This page showcases examples of the carousel component with live demos. Explore different configurations from basic to advanced, and use the provided code samples as starting points for your own implementations.


## Basic

A simple implementation of the carousel with default settings.

<live-codes :code="examples.BasicExample" />

## Wrap Around

Demonstrates a carousel with continuous wrap-around functionality.

<live-codes :code="examples.WrapAroundExample" />

## Vertical

Showcases a vertically scrolling carousel. Adjust the height to better fit your content.

<live-codes :code="examples.VerticalExample" height="475px" />

## Breakpoints

An example of a responsive carousel with breakpoints for varying screen sizes.

<live-codes :code="examples.BreakpointsExample" />

## Autoplay

Illustrates the carousel with autoplay functionality enabled.

<live-codes :code="examples.AutoplayExample" />

## Mouse Wheel

Demonstrates the carousel with mouse wheel scrolling navigation enabled.

<live-codes :code="examples.MouseWheelExample" />

## Active Classes

An example highlighting active items with custom classes.

<live-codes :code="examples.ActiveClassesExample" />

## Custom Navigation

A demonstration of the carousel with fully customizable navigation controls.

<live-codes :code="examples.CustomNavigationExample" height="260px" />

## Gallery

Transforms the carousel into a gallery-style component.

<live-codes :code="examples.GalleryExample" height="455px" />

<script setup>
import LiveCodes from './.vitepress/components/LiveCodes.vue';
import * as examples from './examples';
</script>
