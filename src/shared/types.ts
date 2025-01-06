import {
  BREAKPOINT_MODE_OPTIONS,
  DIR_OPTIONS,
  SNAP_ALIGN_OPTIONS,
  I18N_DEFAULT_CONFIG,
  NORMALIZED_DIR_OPTIONS,
  DIR_MAP,
  SLIDE_EFFECTS,
} from './constants'

export type Breakpoints = {
  [key: number]: Partial<
    Omit<CarouselConfig, 'breakpoints' | 'modelValue' | 'breakpointMode'>
  >
}

export type SlideEffect = (typeof SLIDE_EFFECTS)[number]
export type SnapAlign = (typeof SNAP_ALIGN_OPTIONS)[number]

export type Dir = (typeof DIR_OPTIONS)[number]

export type BreakpointMode = (typeof BREAKPOINT_MODE_OPTIONS)[number]

export type NormalizedDir = (typeof NORMALIZED_DIR_OPTIONS)[number]

export type NonNormalizedDir = keyof typeof DIR_MAP

export type I18nKeys = keyof typeof I18N_DEFAULT_CONFIG

export interface CarouselConfig {
  enabled: boolean
  itemsToShow: number | 'auto'
  itemsToScroll: number
  modelValue?: number
  transition?: number
  gap: number
  autoplay?: number
  snapAlign: SnapAlign
  wrapAround?: boolean
  pauseAutoplayOnHover?: boolean
  mouseDrag?: boolean
  touchDrag?: boolean
  dir?: Dir
  breakpointMode?: BreakpointMode
  breakpoints?: Breakpoints
  height: string | number
  i18n: { [key in I18nKeys]?: string }
  ignoreAnimations: boolean | string[] | string
  slideEffect: SlideEffect
  preventExcessiveDragging: boolean
}

export type VueClass = string | Record<string, boolean> | VueClass[]
