# API <Badge text="Vue@3.2+"/> 

## Methods

To use the API methods, add a reference to the carousel element and then call methods from that reference.

Example:
```html
<Carousel ref="myCarousel">
  ...
</Carousel>
```

```js
import { ref } from 'vue';
const myCarousel = ref(null);

// Methods are available in this reference
myCarousel.next();
myCarousel.updateSlideWidth();
```

### Available methods

#### slideTo(index: number)

Slide to specific slide index

#### next()

Slide to the next slide

#### prev()

Slide to the previous slide

#### updateSlideWidth()

Update `slideWidth` value based on `itemsToShow` and the current carousel width

#### updateSlidesBuffer()

Update `slidesBuffer` array which keep of the slides order, used mainly when `wrapAround` is *true*

#### updateBreakpointsConfigs()

Update the current carousel configs based on `breakpoints` settings and screen width

#### updateSlidesData()

Update all the slide related date includes:

* `currentSlideIndex`
* `middleSlide`
* `maxSlide`
* `minSlide`

#### initCarousel()

Init the carousel configs, internally it calls:

* `initDefaultConfigs`

#### restartCarousel()

Restart the carousel settings and data, internally it calls:

* `initDefaultConfigs`
* `resetAutoplay`
* `updateBreakpointsConfigs`
* `updateSlidesBuffer`
* `updateSlidesData`
* `updateSlideWidth`

#### updateCarousel()

Update the carousel and slides data, it invokes after each slider slide, internally it calls:

* `updateSlidesData`
* `updateSlidesBuffer`

## Data

To use the data values, add a reference to the carousel element and then get the values from the data property.

Example:
```html
<Carousel ref="myCarousel">
  ...
</Carousel>
```

```js
import { ref } from 'vue';
const myCarousel = ref(null);

// Data can be accessed under data property
if (myCarousel.data.currentSlide === 10) {
  // Do your magic here
}
....
```

### Available Data

| Data           | Description                        |
| -------------- | ---------------------------------- |
| `config`       | the current carousel configuration |
| `slidesCount`  | slides total count                 |
| `slideWidth`   | single slide width                 |
| `currentSlide` | current slide index                |
| `maxSlide`     | maximum slide index                |
| `minSlide`     | minimum slide index                |
| `middleSlide`  | middle slide index                 |

<script>
import Badge from './.vitepress/components/Badge.vue';

export default {
  components: {
   Badge,
  }
}
</script>