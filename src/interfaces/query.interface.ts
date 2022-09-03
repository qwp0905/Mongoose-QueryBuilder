import {
  QueryKey,
  QueryValue,
  FilterQuery,
  NotOperator,
  ElemMatchOperator,
  ExtractKeys
} from '@type'

export interface IQueryBuilder<TSchema> {
  eq: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  not: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: NotOperator<QueryValue<TSchema, Key>>
  ) => this

  gt: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this
  gte: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  lt: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  lte: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  exists: <Key extends QueryKey<TSchema>>(key: Key, value?: boolean) => this

  regex: <Key extends ExtractKeys<TSchema, string>>(
    key: Key,
    value?: string | RegExp
  ) => this

  in: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>[]
  ) => this

  ne: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  nin: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>[]
  ) => this

  all: <Key extends ExtractKeys<TSchema, unknown[]>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => this

  size: <Key extends ExtractKeys<TSchema, unknown[]>>(
    key: Key,
    value?: number
  ) => this

  elemMatch: <Key extends ExtractKeys<TSchema, unknown[]>>(
    key: Key,
    value?: ElemMatchOperator<QueryValue<TSchema, Key>>
  ) => this

  or: (conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]) => this

  and: (conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]) => this

  nor: (conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]) => this

  build: () => FilterQuery<TSchema>
}
