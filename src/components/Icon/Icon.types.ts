export enum IconName {
  arrowUp = 'arrowUp',
  arrowDown = 'arrowDown',
  arrowRight = 'arrowRight',
  arrowLeft = 'arrowLeft',
}

export type IconNameValue = `${IconName}`

export interface IconProps {
  title?: string
  name: IconNameValue
}
