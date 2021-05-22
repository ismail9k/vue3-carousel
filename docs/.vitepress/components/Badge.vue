<template>
  <span :class="['badge', type]">{{ text }}</span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    text: '',
    type: '',
  },
};
</script>

<style scoped>
.badge {
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  border-radius: 4px;
  padding: 0 6px;
  color: #fff;
  background-color: #42b983;
  font-weight: bold;
  margin-bottom: 0.5em;
  vertical-align: top;
}
.badge.danger {
  background-color: #d82e3c;
}
</style>