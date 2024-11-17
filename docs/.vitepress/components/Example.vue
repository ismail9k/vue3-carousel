<script setup>
import { onMounted, watch, ref } from 'vue'
import sdk from '@stackblitz/sdk'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  view: {
    type: String,
    default: 'preview',
  },
  clickToLoad: {
    type: Boolean,
    default: false,
  },
  hideNavigation: {
    type: Boolean,
    default: true,
  },
  forceEmbedLayout: {
    type: Boolean,
    default: true,
  },
  openFile: {
    type: String,
    default: 'src/App.vue',
  },
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: [String, Number],
    default: 260,
  },
})

const el = ref(null)
const error = ref(null)

const embedProject = () => {
  if (!el.value) {
    return
  }
  try {
    sdk.embedProjectId(el.value, props.id, {
      forceEmbedLayout: props.forceEmbedLayout,
      openFile: props.openFile,
      hideNavigation: props.hideNavigation,
      height: props.height,
      width: props.width,
      view: props.view,
      clickToLoad: props.clickToLoad,
    })
    error.value = null
  } catch (e) {
    error.value = 'Failed to embed project. Please try again.'
    console.error(e)
  }
}

onMounted(embedProject)
</script>

<template>
  <div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div
      v-else
      :style="{ width: props.width, height: `${props.height}px` }"
      ref="el"
    ></div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
}
</style>