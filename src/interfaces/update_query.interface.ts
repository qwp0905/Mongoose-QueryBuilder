import { Flatten, NotObject, PickKeys, QueryKey, QueryValue } from '@type'
import {
  IUpdateQuery,
  IPushQuery,
  IQuerySelector,
  IRootQuerySelector,
  ISelector
} from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Key extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key>
  ) => IUpdateQueryBuilder<TSchema>

  unset: <Key extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Key
  ) => IUpdateQueryBuilder<TSchema>

  push: <Key extends PickKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?:
      | Flatten<QueryValue<Omit<TSchema, '_id'>, Key>>
      | IPushQuery<Flatten<QueryValue<Omit<TSchema, '_id'>, Key>>>
  ) => IUpdateQueryBuilder<TSchema>

  pop: <Key extends PickKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?: 1 | -1
  ) => IUpdateQueryBuilder<TSchema>

  pull: <Key extends PickKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U extends NotObject
        ? Omit<IQuerySelector<U>, '$eq'> | U
        : IRootQuerySelector<U> & {
            [K in QueryKey<U>]?: ISelector<QueryValue<U, K>>
          }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  inc: <Key extends PickKeys<Omit<TSchema, '_id'>, number>>(
    key: Key,
    value: number
  ) => IUpdateQueryBuilder<TSchema>

  addToSet: <Key extends PickKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U | { $each: U[] }
      : never
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}
