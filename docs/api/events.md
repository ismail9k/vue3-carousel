# Events

Carousel events provide flexibility to intercept and react to navigation changes, offering greater control and customization options.

## How to Use Events

```vue
<script setup>
const handleInit = () => {
  console.log('Carousel initialized')
}
const handleSlideStart = (data) => {
  console.log('Slide started:', data)
}
</script>

<template>
  <Carousel
    @init="handleInit"
    @slide-start="handleSlideStart"
  >
    ...
  </Carousel>
</template>
```

## Event Reference

### @before-init

Triggered before the carousel is initialized. Use this to perform any setup tasks required before the carousel is ready.

### @drag

Triggered while the carousel is being dragged, providing live positional data. Emits the following:

- `x`: The horizontal drag position.
- `y`: The vertical drag position.

### @init

Triggered once the carousel is mounted and fully initialized. This is ideal for executing post-initialization logic.

### @loop

Triggered when the carousel loops over (wraps around), only in wrap-around mode. Emits the following data:

- `currentSlideIndex`: The current slide index before the loop occurs.
- `slidingToIndex`: The index of the slide the carousel loops to.

### @slide-end

Triggered after the sliding animation completes and the current slide is updated. Emits the following data:

- `currentSlideIndex`: The updated current slide index.
- `prevSlideIndex`: The index of the slide before the transition.
- `slidesCount`: The total number of slides in the carousel.

### @slide-registered

Triggered when a new slide is registered with the carousel. Emits the following data:

- `index`: The index position where the slide was registered
- `slide`: The Vue component instance of the registered slide

### @slide-start

Triggered at the beginning of the sliding function. Emits the following data:

- `currentSlideIndex`: The current slide index before the transition starts.
- `prevSlideIndex`: The index of the slide before the current one.
- `slidingToIndex`: The index of the slide the carousel is moving to.
- `slidesCount`: The total number of slides in the carousel.

### @slide-unregistered

Triggered when a slide is unregistered (removed) from the carousel. Emits the following data:

- `index`: The index position from which the slide was removed
- `slide`: The Vue component instance of the unregistered slide

## Notes

- Events are reactive and can be used to trigger animations, analytics, or other custom behaviors.
- Registration events (`slide-registered`, `slide-unregistered`) are particularly useful for tracking slide lifecycle and managing external state.
- Ensure your event handlers account for edge cases, such as looping or rapid navigation.
