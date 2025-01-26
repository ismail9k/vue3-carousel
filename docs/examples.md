# Examples

If you're experiencing issues loading the live examples or you're browsing on a mobile device, visit the [Fallback Examples Page](/examples-fallback) for a better experience.

## Basic

A simple implementation of the carousel with default settings.

<Playground v-bind="examples.basic" />

## Wrap Around

Demonstrates a carousel with continuous wrap-around functionality.

<Playground v-bind="examples.wrapAround" />

## Vertical

Showcases a vertically scrolling carousel. Adjust the height to better fit your content.

<Playground v-bind="examples.vertical" height="475px" />

## Breakpoints

An example of a responsive carousel with breakpoints for varying screen sizes.

<Playground v-bind="examples.breakpoints" />

## Autoplay

Illustrates the carousel with autoplay functionality enabled.

<Playground v-bind="examples.autoplay" />

## Active Classes

An example highlighting active items with custom classes.

<Playground v-bind="examples.activeClasses" />

## Custom Navigation

A demonstration of the carousel with fully customizable navigation controls.

<Playground v-bind="examples.customNavigation" height="260px" />

## Gallery

Transforms the carousel into a gallery-style component.

<Playground v-bind="examples.gallery" height="455px" />

<script setup>
import Playground from './.vitepress/components/Playground.vue';
import { examples } from './examples/examples';
</script>
