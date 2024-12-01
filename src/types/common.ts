export interface Data {
  [key: string]: unknown
}

export type VueClass = string | Record<string, boolean> | VueClass[];
