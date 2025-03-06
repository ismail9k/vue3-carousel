# Data

To use the data values, add a reference to the carousel element and then get the values from the data property.

Example:

```html
<Carousel ref="myCarousel"> ... </Carousel>
```

```js
import { ref } from 'vue';
const myCarousel = ref(null);

// Data can be accessed under data property
if (myCarousel.currentSlide === 10) {
  // Do your magic here
}
....
```

## Available Exposed data

| Data           | Description                                                                                       |
|----------------|---------------------------------------------------------------------------------------------------|
| `currentSlide` | current slide index                                                                               |
| `activeSlide`  | current slide index even while dragging                                                           |
| `isSliding`    | if the slider is dragging                                                                         |
| `isVertical`   | if the slider is vertical                                                                         |
| `nav`          | An object of navigation methods                                                                   |
| `config`       | the current carousel configuration                                                                |
| `maxSlide`     | maximum slide index                                                                               |
| `minSlide`     | minimum slide index                                                                               |
| `slideSize`    | single slide width or height                                                                      |
| `slidesCount`  | slides total count                                                                                |
| `slides`       | an array of Slides component                                                                      |
| `viewport`     | the viewport element                                                                              |
| `visibleRange` | an object with {min, max} properties min being the lowest visible slide index and max the highest |