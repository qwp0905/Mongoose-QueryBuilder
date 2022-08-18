import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IQuerySelector,
  IReplaceOneOption,
  IRootQuerySelector,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interface'
import { NotObject, Join } from '@type'

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

export type QueryKey<TSchema> =
  | { [P in keyof TSchema]: P extends symbol ? never : P }[keyof TSchema]
  | {
      [P in keyof TSchema]: TSchema[P] extends NotObject
        ? never
        : `${P extends symbol ? never : P}.${{
            [K in keyof TSchema[P]]: K extends symbol ? never : K
          }[keyof TSchema[P]]}`
    }[keyof TSchema]
  | {
      [P in keyof TSchema]: TSchema[P] extends NotObject
        ? never
        : `${P extends symbol ? never : P}.${{
            [K in keyof TSchema[P]]: TSchema[P][K] extends NotObject
              ? never
              : `${K extends symbol ? never : K}.${{
                  [U in keyof TSchema[P][K]]: U extends symbol ? never : U
                }[keyof TSchema[P][K]]}`
          }[keyof TSchema[P]]}`
    }[keyof TSchema]

export type QueryValue<
  TSchema,
  Keys extends QueryKey<TSchema>
> = Keys extends `${infer K1}.${infer K2}.${infer K3}`
  ? K1 extends keyof TSchema
    ? K2 extends keyof TSchema[K1]
      ? K3 extends keyof TSchema[K1][K2]
        ? TSchema[K1][K2][K3]
        : never
      : never
    : never
  : Keys extends `${infer K1}.${infer K2}`
  ? K1 extends keyof TSchema
    ? K2 extends keyof TSchema[K1]
      ? TSchema[K1][K2]
      : never
    : never
  : Keys extends keyof TSchema
  ? TSchema[Keys]
  : never

export type FilterQuery<TSchema> = IRootQuerySelector<TSchema> & {
  [P in QueryKey<TSchema>]?:
    | IQuerySelector<QueryValue<TSchema, P>>
    | QueryValue<TSchema, P>
}
