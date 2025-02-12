import {
  BREAKPOINT_MODE_OPTIONS,
  DIR_MAP,
  DIR_OPTIONS,
  I18N_DEFAULT_CONFIG,
  NORMALIZED_DIR_OPTIONS,
  SLIDE_EFFECTS,
  SNAP_ALIGN_OPTIONS,
} from './constants'

export type BreakpointMode = (typeof BREAKPOINT_MODE_OPTIONS)[number]

export type Breakpoints = {
  [key: number]: Partial<
    Omit<CarouselConfig, 'breakpoints' | 'modelValue' | 'breakpointMode'>
  >
}

export type Dir = (typeof DIR_OPTIONS)[number]

export type I18nKeys = keyof typeof I18N_DEFAULT_CONFIG

export type NonNormalizedDir = keyof typeof DIR_MAP

export type NormalizedDir = (typeof NORMALIZED_DIR_OPTIONS)[number]

export type SlideEffect = (typeof SLIDE_EFFECTS)[number]

export type SnapAlign = (typeof SNAP_ALIGN_OPTIONS)[number]

export type CarouselConfig = {
  autoplay?: number
  breakpointMode?: BreakpointMode
  breakpoints?: Breakpoints
  dir?: Dir
  disableInteractionWhenNoOverflow: boolean,
  enabled: boolean
  gap: number
  height: string | number
  i18n: { [key in I18nKeys]?: string }
  ignoreAnimations: boolean | string[] | string
  itemsToScroll: number
  itemsToShow: number | 'auto'
  modelValue?: number
  mouseDrag?: boolean
  pauseAutoplayOnHover?: boolean
  preventExcessiveDragging: boolean
  slideEffect: SlideEffect
  snapAlign: SnapAlign
  touchDrag?: boolean
  transition?: number
  wrapAround?: boolean
}

export type VueClass = string | Record<string, boolean> | VueClass[]
