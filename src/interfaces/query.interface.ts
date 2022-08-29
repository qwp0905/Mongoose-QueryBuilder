import {
  QueryKey,
  QueryValue,
  FilterQuery,
  NotOperator,
  ElemMatchOperator,
  PickKeys
} from '@type'

export interface IQueryBuilder<TSchema> {
  eq: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  not: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: NotOperator<QueryValue<TSchema, Key>>
  ) => IQueryBuilder<TSchema>

  gt: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  gte: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  lt: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  lte: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  exists: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: boolean
  ) => IQueryBuilder<TSchema>

  regex: <Key extends PickKeys<TSchema, string>>(
    key: Key,
    value?: string | RegExp
  ) => IQueryBuilder<TSchema>

  in: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>[]
  ) => IQueryBuilder<TSchema>

  ne: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  nin: <Key extends QueryKey<TSchema>>(
    key: Key,
    value?: QueryValue<TSchema, Key>[]
  ) => IQueryBuilder<TSchema>

  all: <Key extends PickKeys<TSchema, any[]>>(
    key: Key,
    value?: QueryValue<TSchema, Key>
  ) => IQueryBuilder<TSchema>

  size: <Key extends PickKeys<TSchema, any[]>>(
    key: Key,
    value?: number
  ) => IQueryBuilder<TSchema>

  elemMatch: <Key extends PickKeys<TSchema, any[]>>(
    key: Key,
    value?: ElemMatchOperator<QueryValue<TSchema, Key>>
  ) => IQueryBuilder<TSchema>

  or: (
    conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]
  ) => IQueryBuilder<TSchema>

  and: (
    conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]
  ) => IQueryBuilder<TSchema>

  nor: (
    conditions?: FilterQuery<TSchema> | FilterQuery<TSchema>[]
  ) => IQueryBuilder<TSchema>

  build: () => FilterQuery<TSchema>
}
