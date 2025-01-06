# Methods

To use the API methods, add a reference to the carousel element and then call methods from that reference.

Example:

```html
<Carousel ref="myCarousel"> ... </Carousel>
```

```js
import { ref } from 'vue'
const myCarousel = ref(null)

// Methods are available in this reference
myCarousel.next()
myCarousel.updateSlideSize()
```

## next()

Slide to the next slide

## prev()

Slide to the previous slide

## restartCarousel()

Restart the carousel settings and data, internally it calls:

- `resetAutoplay`
- `updateBreakpointsConfig`
- `updateSlidesData`
- `updateSlideSize`

## slideTo(index: number, skipTransition = false)

Slide to specific slide index

## updateBreakpointsConfig()

Update the current carousel config based on `breakpoints` settings and screen width

## updateSlideSize()

Update `slideSize` value based on `itemsToShow`, `dir` and the current carousel width/height

## updateSlidesData()

Update all the slide related date includes:

- `currentSlideIndex`
- `maxSlide`
- `middleSlide`
- `minSlide`
