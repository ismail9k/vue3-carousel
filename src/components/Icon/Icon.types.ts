export enum IconName {
  arrowDown = 'arrowDown',
  arrowLeft = 'arrowLeft',
  arrowRight = 'arrowRight',
  arrowUp = 'arrowUp',
}

export type IconNameValue = `${IconName}`

export type IconProps = {
  name: IconNameValue
  title?: string
}
