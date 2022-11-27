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
if (myCarousel.data.currentSlide === 10) {
  // Do your magic here
}
....
```

## Available Data

| Data           | Description                        |
| -------------- | ---------------------------------- |
| `config`       | the current carousel configuration |
| `slidesCount`  | slides total count                 |
| `slideWidth`   | single slide width                 |
| `currentSlide` | current slide index                |
| `maxSlide`     | maximum slide index                |
| `minSlide`     | minimum slide index                |
| `middleSlide`  | middle slide index                 |
