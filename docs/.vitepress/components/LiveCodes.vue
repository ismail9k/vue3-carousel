<script setup lang="ts">
import { watch } from 'vue'
import { useData } from 'vitepress'
import type { EmbedOptions, Playground } from 'livecodes'
import LiveCodes from 'livecodes/vue'

const props = defineProps<{
  code: string
  styles?: string
  loading?: 'lazy' | 'click' | 'eager'
  view?: 'split' | 'editor' | 'result'
  mode?: 'full' | 'focus' | 'simple' | 'editor' | 'codeblock' | 'result'
  height?: string
}>()

const { isDark } = useData()

const config: EmbedOptions['config'] = {
  title: 'Vue3-carousel',
  theme: isDark.value ? 'dark' : 'light',
  themeColor: 'hsl(220, 14%, 80%)',
  view: props.view || 'result',
  mode: props.mode || 'simple',
  activeEditor: 'script',
  tools: {
    status: 'none',
  },
  style: {
    language: 'css',
    content: props.styles || '',
  },
  script: {
    language: 'vue',
    content: props.code,
    title: 'App.vue',
  },
  imports: {
    vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.runtime.esm-browser.prod.js',
    'vue3-carousel': 'https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.mjs',
    'vue3-carousel/carousel.css':
      'https://cdn.jsdelivr.net/npm/vue3-carousel/dist/carousel.css',
  },
}

let playground: Playground | undefined
const onReady = (sdk: Playground) => {
  playground = sdk
}

watch(isDark, () => {
  if (playground) {
    playground.setConfig({
      theme: isDark.value ? 'dark' : 'light',
    })
  }
})
</script>

<template>
  <LiveCodes
    appUrl="https://v43.livecodes.io/"
    :config="config"
    @sdk-ready="onReady"
    :style="{ height: props.height || '250px' }"
  />
</template>
