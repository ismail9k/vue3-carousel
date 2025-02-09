# Examples

If you're experiencing issues loading the live examples or you're browsing on a mobile device, visit the [Fallback Examples Page](/examples-fallback) for a better experience.

## Basic

A simple implementation of the carousel with default settings.

<live-codes v-bind="LiveCodeExamples.basic" />

## Wrap Around

Demonstrates a carousel with continuous wrap-around functionality.

<live-codes v-bind="LiveCodeExamples.wrapAround" />

## Vertical

Showcases a vertically scrolling carousel. Adjust the height to better fit your content.

<live-codes v-bind="LiveCodeExamples.vertical" height="475px" />

## Breakpoints

An example of a responsive carousel with breakpoints for varying screen sizes.

<live-codes v-bind="LiveCodeExamples.breakpoints" />

## Autoplay

Illustrates the carousel with autoplay functionality enabled.

<live-codes v-bind="LiveCodeExamples.autoplay" />

## Active Classes

An example highlighting active items with custom classes.

<live-codes v-bind="LiveCodeExamples.activeClasses" />

## Custom Navigation

A demonstration of the carousel with fully customizable navigation controls.

<live-codes v-bind="LiveCodeExamples.customNavigation" height="260px" />

## Gallery

Transforms the carousel into a gallery-style component.

<live-codes v-bind="LiveCodeExamples.gallery" height="455px" />

<script setup>
import LiveCodes from './.vitepress/components/LiveCodes.vue';
import { LiveCodeExamples } from './examples';
</script>
