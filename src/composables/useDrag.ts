import { ref, reactive, computed, Ref } from 'vue'

import { throttle } from '@/utils'

export type DragEventData = {
  deltaX: number
  deltaY: number
  isTouch: boolean
}
export interface UseDragOptions {
  isSliding: boolean | Ref<boolean>
  onDrag?: ({ deltaX, deltaY, isTouch }: DragEventData) => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useDrag(options: UseDragOptions) {
  let isTouch = false
  const startPosition = { x: 0, y: 0 }
  const dragged = reactive({ x: 0, y: 0 })
  const isDragging = ref(false)

  const { isSliding } = options

  const sliding = computed(() => {
    return typeof isSliding === 'boolean' ? isSliding : isSliding.value
  })

  const handleDragStart = (event: MouseEvent | TouchEvent): void => {
    // Prevent drag initiation on input elements or if already sliding
    const targetTagName = (event.target as HTMLElement).tagName
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTagName) || sliding.value) {
      return
    }

    isTouch = event.type === 'touchstart'

    if (!isTouch) {
      event.preventDefault()
      if ((event as MouseEvent).button !== 0) {
        return
      }
    }

    startPosition.x = isTouch
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX
    startPosition.y = isTouch
      ? (event as TouchEvent).touches[0].clientY
      : (event as MouseEvent).clientY

    const moveEvent = isTouch ? 'touchmove' : 'mousemove'
    const endEvent = isTouch ? 'touchend' : 'mouseup'
    document.addEventListener(moveEvent, handleDrag, { passive: false })
    document.addEventListener(endEvent, handleDragEnd, { passive: true })

    options.onDragStart?.()
  }

  const handleDrag = throttle((event: TouchEvent | MouseEvent): void => {
    isDragging.value = true

    const currentX = isTouch
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX
    const currentY = isTouch
      ? (event as TouchEvent).touches[0].clientY
      : (event as MouseEvent).clientY

    dragged.x = currentX - startPosition.x
    dragged.y = currentY - startPosition.y

    options.onDrag?.({ deltaX: dragged.x, deltaY: dragged.y, isTouch })
  })

  const handleDragEnd = (): void => {
    handleDrag.cancel()

    if (!isTouch) {
      const preventClick = (e: MouseEvent) => {
        e.preventDefault()
        window.removeEventListener('click', preventClick)
      }
      window.addEventListener('click', preventClick)
    }

    options.onDragEnd?.()

    dragged.x = 0
    dragged.y = 0
    isDragging.value = false

    const moveEvent = isTouch ? 'touchmove' : 'mousemove'
    const endEvent = isTouch ? 'touchend' : 'mouseup'
    document.removeEventListener(moveEvent, handleDrag)
    document.removeEventListener(endEvent, handleDragEnd)
  }

  return {
    dragged,
    isDragging,
    handleDragStart,
  }
}
