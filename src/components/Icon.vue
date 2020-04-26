<template functional>
  <svg viewBox="0 0 24 24" class="carousel__icon" role="img">
    <title>{{ iconTitle }}</title>
    <path :d="path" />
  </svg>
</template>

<script>
import icons from '../icons';

export default {
  name: 'Icon',
  props: {
    name: String,
    title: String,
  },
  setup(props) {
    const path = icons[props.name];
    const iconTitle = props.title || props.name;

    return {
      path,
      iconTitle,
    };
  },
};
</script>

<style>
.carousel__icon {
  width: 1.2em;
  height: 1.2em;
  fill: currentColor;
}
</style>
