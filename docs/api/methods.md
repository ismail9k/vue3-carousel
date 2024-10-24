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
myCarousel.updateSlideWidth()
```

## slideTo(index: number)

Slide to specific slide index

## next()

Slide to the next slide

## prev()

Slide to the previous slide

## updateSlideWidth()

Update `slideWidth` value based on `itemsToShow` and the current carousel width

## updateBreakpointsConfig()

Update the current carousel config based on `breakpoints` settings and screen width

## updateSlidesData()

Update all the slide related date includes:

- `currentSlideIndex`
- `middleSlide`
- `maxSlide`
- `minSlide`

## initDefaultConfig()

Init carousel default configurations

## restartCarousel()

Restart the carousel settings and data, internally it calls:

- `initDefaultConfig`
- `resetAutoplay`
- `updateBreakpointsConfig`
- `updateSlidesData`
- `updateSlideWidth`
