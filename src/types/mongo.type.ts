import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IReplaceOneOption,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interface'
import { NotObject, StringKeys, StringNumber } from '@type'

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
//       [P in keyof TSchema]: TSchema[P] extends NotObject
//         ? never
//         : `${P extends symbol ? never : P}.${{
//             [K in keyof TSchema[P]]: K extends symbol ? never : K
//           }[keyof TSchema[P]]}`
//     }[keyof TSchema]
//   | {
//       [P in keyof TSchema]: TSchema[P] extends NotObject
//         ? never
//         : `${P extends symbol ? never : P}.${{
//             [K in keyof TSchema[P]]: TSchema[P][K] extends NotObject
//               ? never
//               : `${K extends symbol ? never : K}.${{
//                   [U in keyof TSchema[P][K]]: U extends symbol ? never : U
//                 }[keyof TSchema[P][K]]}`
//           }[keyof TSchema[P]]}`
//     }[keyof TSchema]
//   | {
//       [P in keyof TSchema]: TSchema[P] extends NotObject
//         ? never
//         : `${P extends symbol ? never : P}.${{
//             [K in keyof TSchema[P]]: TSchema[P][K] extends NotObject
//               ? never
//               : `${K extends symbol ? never : K}.${{
//                   [U in keyof TSchema[P][K]]: TSchema[P][K][U] extends NotObject
//                     ? never
//                     : `${U extends symbol ? never : U}.${{
//                         [L in keyof TSchema[P][K][U]]: L extends symbol
//                           ? never
//                           : L
//                       }[keyof TSchema[P][K][U]]}`
//                 }[keyof TSchema[P][K]]}`
//           }[keyof TSchema[P]]}`
//     }[keyof TSchema]

// export type QueryValue<
//   TSchema,
//   Keys extends QueryKey<TSchema>
// > = Keys extends `${infer K1}.${infer K2}.${infer K3}.${infer K4}`
//   ? K1 extends keyof TSchema
//     ? K2 extends keyof TSchema[K1]
//       ? K3 extends keyof TSchema[K1][K2]
//         ? K4 extends keyof TSchema[K1][K2][K3]
//           ? TSchema[K1][K2][K3][K4]
//           : never
//         : never
//       : never
//     : never
//   : Keys extends `${infer K1}.${infer K2}.${infer K3}`
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
        : `${P extends symbol ? never : P}${_QueryKey<TSchema[P]>}`
    }[keyof TSchema]

type _QueryKey<TSchema> = TSchema extends NotObject
  ? ``
  : `.${TSchema extends Array<infer A>
      ?
          | `${number}${_QueryKey<A> | ``}`
          | {
              [P in StringKeys<A>]: `${P}${_QueryKey<A[P]> | ``}`
            }[StringKeys<A>]
      : {
          [P in StringKeys<TSchema>]: `${P}${_QueryKey<TSchema[P]> | ``}`
        }[StringKeys<TSchema>]}`

export type QueryValue<
  TSchema,
  Keys extends QueryKey<TSchema>
> = Keys extends `${infer K1}.${infer K2}`
  ? K1 extends keyof TSchema
    ? `.${K2}` extends _QueryKey<TSchema[K1]>
      ? _QueryValue<TSchema[K1], `.${K2}`>
      : never
    : never
  : Keys extends keyof TSchema
  ? TSchema[Keys]
  : never

type _QueryValue<
  TSchema,
  Keys extends _QueryKey<TSchema>
> = Keys extends `.${infer K1}.${infer K2}`
  ? K1 extends keyof TSchema
    ? `.${K2}` extends _QueryKey<TSchema[K1]>
      ? _QueryValue<TSchema[K1], `.${K2}`>
      : never
    : K1 extends StringNumber
    ? TSchema extends Array<infer U>
      ? `.${K2}` extends _QueryKey<U>
        ? _QueryValue<U, `.${K2}`>
        : never
      : never
    : never
  : Keys extends `.${infer K1}`
  ? K1 extends keyof TSchema
    ? TSchema[K1]
    : K1 extends StringNumber
    ? TSchema extends Array<infer U>
      ? U
      : never
    : never
  : never
