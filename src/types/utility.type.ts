export type StringKeys<T> = {
  [P in keyof T]: Extract<P, string>
}[keyof T]

export type NotObject =
  | string
  | number
  | boolean
  | Date
  | RegExp
  | Buffer
  | ((...args: unknown[]) => unknown)
  | {
      _bsontype: string
    }

export type Join<
  T extends string | number,
  P extends string | number
> = `${T}.${P}`

export type MaxDepth = 0 | 1

export type Next<T extends MaxDepth> = [1, 2][T]

export type Before<T extends MaxDepth> = [-1, 0][T]

export type StringNumber =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'

export type Flatten<T> = T extends (infer U)[] ? U : T
