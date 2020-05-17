<template>
  <svg viewBox="0 0 24 24" class="carousel__icon" role="img">
    <title>{{ iconTitle }}</title>
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import icons from '../partials/icons';

import { Data } from 'vue/types';

export default {
  name: 'Icon',
  props: {
    name: String,
    title: String,
  },
  setup(props: Data): Data {
    const path = icons[props.name];
    const iconTitle = props.title || props.name;

    return {
      path,
      iconTitle,
    };
  },
};
</script>
