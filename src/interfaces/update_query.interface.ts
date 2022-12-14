import { NotObject, ExtractKeys, QueryKey, QueryValue } from '@type'
import { IUpdateQuery, IPushQuery, IQueryOperator, IOperator } from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Key extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key>
  ) => this

  unset: <Key extends QueryKey<Omit<TSchema, '_id'>>>(key: Key) => this

  push: <Key extends ExtractKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U | IPushQuery<U>
      : never
  ) => this

  pop: <Key extends ExtractKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?: 1 | -1
  ) => this

  pull: <Key extends ExtractKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U extends NotObject
        ? Omit<IQueryOperator<U>, '$eq'> | U
        : U extends unknown[]
        ? never
        : {
            [K in QueryKey<U>]?: IOperator<QueryValue<U, K>>
          }
      : never
  ) => this

  inc: <Key extends ExtractKeys<Omit<TSchema, '_id'>, number>>(
    key: Key,
    value: number
  ) => this

  addToSet: <Key extends ExtractKeys<Omit<TSchema, '_id'>, unknown[]>>(
    key: Key,
    value?: QueryValue<Omit<TSchema, '_id'>, Key> extends (infer U)[]
      ? U | { $each: U[] }
      : never
  ) => this

  build: () => IUpdateQuery<TSchema>
}
