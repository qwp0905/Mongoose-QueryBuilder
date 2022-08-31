import {
  NotObject,
  StringKeys,
  StringNumber,
  MaxDepth,
  Next,
  Before
} from '@type'

// export type QueryKey<TSchema> =
//   | { [P in keyof TSchema]: P extends symbol ? never : P }[keyof TSchema]
//   | {
//       [P in keyof TSchema]: TSchema[P] extends NotObject | any[]
//         ? never
//         : `${P extends symbol ? never : P}.${{
//             [K in keyof TSchema[P]]: K extends symbol ? never : K
//           }[keyof TSchema[P]]}`
//     }[keyof TSchema]
//   | {
//       [P in keyof TSchema]: TSchema[P] extends NotObject | any[]
//         ? never
//         : `${P extends symbol ? never : P}.${{
//             [K in keyof TSchema[P]]: TSchema[P][K] extends NotObject | any[]
//               ? never
//               : `${K extends symbol ? never : K}.${{
//                   [U in keyof TSchema[P][K]]: U extends symbol ? never : U
//                 }[keyof TSchema[P][K]]}`
//           }[keyof TSchema[P]]}`
//     }[keyof TSchema]

// export type QueryValue<
//   TSchema,
//   Keys extends QueryKey<TSchema>
// > = Keys extends `${infer K1}.${infer K2}.${infer K3}`
//   ? K1 extends keyof TSchema
//     ? K2 extends keyof TSchema[K1]
//       ? K3 extends keyof TSchema[K1][K2]
//         ? TSchema[K1][K2][K3]
//         : never
//       : never
//     : never
//   : Keys extends `${infer K1}.${infer K2}`
//   ? K1 extends keyof TSchema
//     ? K2 extends keyof TSchema[K1]
//       ? TSchema[K1][K2]
//       : never
//     : never
//   : Keys extends keyof TSchema
//   ? TSchema[Keys]
//   : never

export type QueryKey<TSchema> =
  | StringKeys<TSchema>
  | {
      [P in keyof TSchema]: TSchema[P] extends NotObject
        ? never
        : `${P extends symbol ? never : P}${_QueryKey<TSchema[P], 0>}`
    }[keyof TSchema]

type _QueryKey<T, Depth extends number> = Depth extends MaxDepth
  ? T extends NotObject
    ? never
    : T extends (infer A)[]
    ?
        | `.${StringNumber}`
        | `.${StringNumber}${_QueryKey<A, Next<Depth>>}`
        | _QueryKey<A, Next<Depth>>
    : {
        [P in StringKeys<T>]: `.${P}` | `.${P}${_QueryKey<T[P], Next<Depth>>}`
      }[StringKeys<T>]
  : never

export type QueryValue<
  TSchema,
  Keys extends QueryKey<TSchema>
> = Keys extends keyof TSchema
  ? TSchema[Keys]
  : Keys extends `${infer K1}.${infer K2}`
  ? K1 extends keyof TSchema
    ? `.${K2}` extends _QueryKey<TSchema[K1], MaxDepth>
      ? _QueryValue<TSchema[K1], `.${K2}`>
      : never
    : never
  : never

type _QueryValue<
  T,
  Keys extends _QueryKey<T, MaxDepth>
> = Keys extends `.${infer K}`
  ? K extends keyof T
    ? T[K]
    : K extends StringNumber
    ? T extends (infer A)[]
      ? A
      : never
    : K extends `${infer K1}.${infer K2}`
    ? K1 extends keyof T
      ? K2 extends keyof T[K1]
        ? T[K1][K2]
        : K2 extends StringNumber
        ? T[K1] extends (infer A)[]
          ? A
          : never
        : `.${K2}` extends _QueryKey<T[K1], Before<MaxDepth>>
        ? _QueryValue<T[K1], `.${K2}`>
        : never
      : K1 extends StringNumber
      ? T extends (infer A1)[]
        ? K2 extends keyof A1
          ? A1[K2]
          : K2 extends StringNumber
          ? A1 extends (infer A2)[]
            ? A2
            : never
          : `.${K2}` extends _QueryKey<A1, Before<MaxDepth>>
          ? _QueryValue<A1, `.${K2}`>
          : never
        : never
      : never
    : never
  : never

// type _QueryValue<T, Keys extends _QueryKey<T, MaxDepth>> = T extends (infer U)[]
//   ? Keys extends `.${infer K1}.${infer K2}`
//     ? K1 extends keyof U
//       ? `.${K2}` extends _QueryKey<U[K1], Before<MaxDepth>>
//         ? _QueryValue<U[K1], `.${K2}`>
//         : never
//       : K1 extends StringNumber
//       ? `.${K2}` extends _QueryKey<U[], Before<MaxDepth>>
//         ? _QueryValue<U[], `.${K2}`>
//         : never
//       : never
//     : Keys extends `.${StringNumber}`
//     ? U
//     : Keys extends `.${infer K1}`
//     ? K1 extends keyof U
//       ? U[K1]
//       : never
//     : never
//   : Keys extends `.${infer K1}.${infer K2}`
//   ? K1 extends keyof T
//     ? `.${K2}` extends _QueryKey<T[K1], Before<MaxDepth>>
//       ? _QueryValue<T[K1], `.${K2}`>
//       : never
//     : never
//   : Keys extends `.${infer K1}`
//   ? K1 extends keyof T
//     ? T[K1]
//     : never
//   : never

export type ExcludeKeys<TSchema, K> = {
  [P in QueryKey<TSchema>]: QueryValue<TSchema, P> extends K ? never : P
}[QueryKey<TSchema>]

export type PickKeys<TSchema, K> = {
  [P in QueryKey<TSchema>]: QueryValue<TSchema, P> extends K ? P : never
}[QueryKey<TSchema>]
