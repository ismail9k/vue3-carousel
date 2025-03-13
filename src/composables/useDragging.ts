import { ref, reactive } from 'vue'

import { throttle } from '@/utils'

export interface UseDraggingOptions {
  onDrag?: (data: { delta: { x: number; y: number }; isTouch: boolean }) => void
  onDragStart?: () => void
  onDragEnd?: () => void
  isSliding?: boolean
}

export function useDragging(options: UseDraggingOptions = {}) {
  let isTouch = false
  const startPosition = { x: 0, y: 0 }
  const dragged = reactive({ x: 0, y: 0 })
  const isDragging = ref(false)

  const handleDragStart = (event: MouseEvent | TouchEvent): void => {
    // Prevent drag initiation on input elements or if already sliding
    const targetTagName = (event.target as HTMLElement).tagName
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTagName) || options.isSliding) {
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
    document.addEventListener(moveEvent, handleDragging, { passive: false })
    document.addEventListener(endEvent, handleDragEnd, { passive: true })

    options.onDragStart?.()
  }

  const handleDragging = throttle((event: TouchEvent | MouseEvent): void => {
    isDragging.value = true

    const currentX = isTouch
      ? (event as TouchEvent).touches[0].clientX
      : (event as MouseEvent).clientX
    const currentY = isTouch
      ? (event as TouchEvent).touches[0].clientY
      : (event as MouseEvent).clientY

    dragged.x = currentX - startPosition.x
    dragged.y = currentY - startPosition.y

    options.onDrag?.({ delta: { x: dragged.x, y: dragged.y }, isTouch })
  })

  const handleDragEnd = (): void => {
    handleDragging.cancel()

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
    document.removeEventListener(moveEvent, handleDragging)
    document.removeEventListener(endEvent, handleDragEnd)
  }

  return {
    dragged,
    isDragging,
    handleDragStart,
  }
}
