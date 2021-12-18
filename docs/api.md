# API <Badge text="Vue@3.2+"/> 

## Available methods

### slideTo(index: number)

Slide to specific slide index

### next()

Slide to the next slide

### prev()

Slide to the previous slide

### updateSlideWidth()

Update `slideWidth` value based on `itemsToShow` and the current carousel width

### updateSlidesBuffer()

Update `slidesBuffer` array which keep of the slides order, used mainly when `wrapAround` is *true*

### updateBreakpointsConfigs()

Update the current carousel configs based on `breakpoints` settings and screen width

### updateSlidesData()

Update all the slide related date includes:

* `currentSlideIndex`
* `middleSlide`
* `maxSlide`
* `minSlide`

### initCarousel()

Init the carousel configs, internally it calls:

* `initDefaultConfigs`

### restartCarousel()

Restart the carousel settings and data, internally it calls:

* `initDefaultConfigs`
* `updateBreakpointsConfigs`
* `updateSlidesBuffer`
* `updateSlidesData`
* `updateSlideWidth`

### updateCarousel()

Update the carousel and slides data, it invokes after each slider slide, internally it calls:

* `updateSlidesData`
* `updateSlidesBuffer`

## Available Data

Coming soon

<script>
import Badge from './.vitepress/components/Badge.vue';

export default {
  components: {
   Badge,
  }
}
</script>