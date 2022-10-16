# Dev

<ExampleBasic></ExampleBasic>

<script>
import ExampleBasic from './examples/ExampleBasic.vue';

export default {
  components: {
    ExampleBasic,
  }
}
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: #642afb;
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 1px;
}
</style>