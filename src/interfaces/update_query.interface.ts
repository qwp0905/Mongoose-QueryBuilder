import { QueryKey, QueryValue } from '@type'
import { IUpdateQuery, IQuerySelector } from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: QueryValue<Omit<TSchema, '_id'>, Keys>
  ) => IUpdateQueryBuilder<TSchema>

  unset: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys
  ) => IUpdateQueryBuilder<TSchema>

  push: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: QueryValue<Omit<TSchema, '_id'>, Keys> extends Array<infer U>
      ? U | IPushQuery<U>
      : never
  ) => IUpdateQueryBuilder<TSchema>

  pop: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
      ? 1 | -1
      : never
  ) => IUpdateQueryBuilder<TSchema>

  pull: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value: QueryValue<Omit<TSchema, '_id'>, Keys> extends Array<infer U>
      ? { [K in QueryKey<U>]?: IQuerySelector<QueryValue<U, K>> }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}

export interface IPushQuery<T> {
  $slice?: number
  $each: Array<T>
  $sort?: T extends string | number
    ? 1 | -1
    : T extends any[]
    ? never
    : { [P in QueryKey<T>]?: 1 | -1 }
  $position?: number
}
