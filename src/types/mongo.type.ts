import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IReplaceOneOption,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interface'
import {
  NotObject,
  StringKeys,
  StringNumber,
  MaxDepth,
  Next,
  Before
} from '@type'

export type Bulk<TSchema> =
  | {
      insertOne: IInsertOneOption<TSchema>
    }
  | {
      replaceOne: IReplaceOneOption<TSchema>
    }
  | {
      updateOne: IUpdateOneOption<TSchema>
    }
  | {
      updateMany: IUpdateManyOption<TSchema>
    }
  | {
      deleteOne: IDeleteOneOption<TSchema>
    }
  | {
      deleteMany: IDeleteManyOption<TSchema>
    }

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
    : T extends Array<infer A>
    ?
        | `.${StringNumber}`
        | `.${StringNumber}${_QueryKey<A, Next<Depth>>}`
        | _QueryKey<A, Next<Depth>>
    : {
        [P in StringKeys<T>]: `.${P}${_QueryKey<T[P], Next<Depth>>}` | `.${P}`
      }[StringKeys<T>]
  : never

export type QueryValue<
  TSchema,
  Keys extends QueryKey<TSchema>
> = Keys extends `${infer K1}.${infer K2}`
  ? K1 extends keyof TSchema
    ? `.${K2}` extends _QueryKey<TSchema[K1], MaxDepth>
      ? _QueryValue<TSchema[K1], `.${K2}`>
      : never
    : never
  : Keys extends keyof TSchema
  ? TSchema[Keys]
  : never

type _QueryValue<T, Keys extends _QueryKey<T, MaxDepth>> = T extends (infer U)[]
  ? Keys extends `.${infer K1}.${infer K2}`
    ? K1 extends keyof U
      ? `.${K2}` extends _QueryKey<U[K1], Before<MaxDepth>>
        ? _QueryValue<U[K1], `.${K2}`>
        : never
      : K1 extends StringNumber
      ? `.${K2}` extends _QueryKey<U[], Before<MaxDepth>>
        ? _QueryValue<U[], `.${K2}`>
        : never
      : never
    : Keys extends `.${StringNumber}`
    ? U
    : Keys extends `.${infer K1}`
    ? K1 extends keyof U
      ? U[K1]
      : never
    : never
  : Keys extends `.${infer K1}.${infer K2}`
  ? K1 extends keyof T
    ? `.${K2}` extends _QueryKey<T[K1], Before<MaxDepth>>
      ? _QueryValue<T[K1], `.${K2}`>
      : never
    : never
  : Keys extends `.${infer K1}`
  ? K1 extends keyof T
    ? T[K1]
    : never
  : never
