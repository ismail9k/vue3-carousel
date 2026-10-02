import { NativeSnapAlign } from '@/shared'

export type EdgeRect = {
  top: number
  right: number
  bottom: number
  left: number
}

export type NativeAlignOptions = {
  align: NativeSnapAlign
  isReversed: boolean
  isVertical: boolean
}

/**
 * The coordinate (client px, along the carousel axis) of a rect's snap point:
 * its logical start edge, end edge, or middle. The logical start is the right
 * (or bottom) edge when the direction is reversed.
 */
export function getAlignPoint(
  rect: EdgeRect,
  { align, isReversed, isVertical }: NativeAlignOptions
): number {
  const [start, end] = isVertical ? [rect.top, rect.bottom] : [rect.left, rect.right]
  if (align === 'center') {
    return (start + end) / 2
  }
  const usePhysicalStart = (align === 'start') !== isReversed
  return usePhysicalStart ? start : end
}

/**
 * How far the viewport must scroll (positive = right/down in client px) so the
 * slide's snap point meets the viewport's. Direction-agnostic: `scrollBy` with a
 * positive value moves the view right in both ltr and rtl.
 */
export function getNativeScrollDelta({
  slideRect,
  viewportRect,
  ...options
}: NativeAlignOptions & { slideRect: EdgeRect; viewportRect: EdgeRect }): number {
  return getAlignPoint(slideRect, options) - getAlignPoint(viewportRect, options)
}
