import { NotObject, QueryKey, QueryValue } from '@type'
import {
  IUpdateQuery,
  IPushQuery,
  IQuerySelector,
  IRootQuerySelector,
  ISelector
} from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: QueryValue<Omit<TSchema, '_id'>, Keys>
  ) => IUpdateQueryBuilder<TSchema>

  unset: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys
  ) => IUpdateQueryBuilder<TSchema>

  push: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value?: QueryValue<Omit<TSchema, '_id'>, Keys> extends (infer U)[]
      ? U | IPushQuery<U>
      : never
  ) => IUpdateQueryBuilder<TSchema>

  pop: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value?: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
      ? 1 | -1
      : never
  ) => IUpdateQueryBuilder<TSchema>

  pull: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value: QueryValue<Omit<TSchema, '_id'>, Keys> extends (infer U)[]
      ? U extends NotObject
        ? Omit<IQuerySelector<U>, '$eq'>
        : IRootQuerySelector<U> & {
            [K in QueryKey<U>]?: ISelector<QueryValue<U, K>>
          }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  inc: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends number
        ? P
        : never
    }[Keys],
    value: QueryValue<Omit<TSchema, '_id'>, Keys> extends number
      ? number
      : never
  ) => IUpdateQueryBuilder<TSchema>

  addToSet: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value?: QueryValue<Omit<TSchema, '_id'>, Keys> extends (infer U)[]
      ? U | { $each: U[] }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}
