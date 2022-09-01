import { FilterQuery, Flatten, PickKeys, QueryKey, QueryValue } from '@type'
import { IUpdateQuery, IPushQuery } from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Key extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key>
  ) => IUpdateQueryBuilder<TSchema>

  unset: <Key extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Key
  ) => IUpdateQueryBuilder<TSchema>

  push: <Key extends PickKeys<Omit<TSchema, '_id'>, any[]>>(
    key: Key,
    value?:
      | Flatten<QueryValue<Omit<TSchema, '_id'>, Key>>
      | IPushQuery<Flatten<QueryValue<Omit<TSchema, '_id'>, Key>>>
  ) => IUpdateQueryBuilder<TSchema>

  pop: <Key extends PickKeys<Omit<TSchema, '_id'>, any[]>>(
    key: Key,
    value?: 1 | -1
  ) => IUpdateQueryBuilder<TSchema>

  pull: <Key extends PickKeys<Omit<TSchema, '_id'>, any[]>>(
    key: Key,
    value: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U | FilterQuery<U>
      : never
  ) => IUpdateQueryBuilder<TSchema>

  inc: <Key extends PickKeys<Omit<TSchema, '_id'>, number>>(
    key: Key,
    value: number
  ) => IUpdateQueryBuilder<TSchema>

  addToSet: <Key extends PickKeys<Omit<TSchema, '_id'>, any[]>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U | { $each: U[] }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}
