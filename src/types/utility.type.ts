export type StringKeys<T> = {
  [P in keyof T]: P extends symbol ? never : P
}[keyof T]

export type NotObject =
  | string
  | number
  | boolean
  | Date
  | RegExp
  | Buffer
  | Uint8Array
  | ((...args: any[]) => any)
  | {
      _bsontype: string
    }

export type Join<
  T extends string | number,
  P extends string | number
> = `${T}.${P}`

export type StringNumber = `${number}`

export type Flatten<T> = T extends Array<infer U> ? U : T
