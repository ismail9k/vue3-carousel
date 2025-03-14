import { ref } from 'vue'

export function useHover() {
  const isHover = ref(false)

  const handleMouseEnter = (): void => {
    isHover.value = true
  }

  const handleMouseLeave = (): void => {
    isHover.value = false
  }

  return {
    isHover,
    handleMouseEnter,
    handleMouseLeave,
  }
}
