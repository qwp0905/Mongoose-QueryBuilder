import { QueryKey, QueryValue, NotObject, FilterQuery } from '@type'
import { IQuerySelector } from '@interface'

export interface IQueryBuilder<TSchema> {
  eq: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  not: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys> extends string
      ? QueryValue<TSchema, Keys> | RegExp
      : QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  gt: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  gte: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  lt: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  lte: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  exists: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: boolean
  ) => IQueryBuilder<TSchema>

  regex: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    pattern?: QueryValue<TSchema, Keys> extends string ? RegExp | string : never
  ) => IQueryBuilder<TSchema>

  in: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: Array<QueryValue<TSchema, Keys>>
  ) => IQueryBuilder<TSchema>

  ne: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  nin: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: Array<QueryValue<TSchema, Keys>>
  ) => IQueryBuilder<TSchema>

  all: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys> extends Array<infer U> ? U[] : never
  ) => IQueryBuilder<TSchema>

  size: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys> extends any[] ? number : never
  ) => IQueryBuilder<TSchema>

  elemMatch: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys> extends Array<infer U>
      ? U extends NotObject
        ? U extends Array<infer K>
          ? { $size?: number; $all?: K[]; $elemMatch?: any }
          : IQuerySelector<U>
        : FilterQuery<U>
      : never
  ) => IQueryBuilder<TSchema>

  or: (
    conditions?: FilterQuery<TSchema> | Array<FilterQuery<TSchema>>
  ) => IQueryBuilder<TSchema>

  and: (
    conditions?: FilterQuery<TSchema> | Array<FilterQuery<TSchema>>
  ) => IQueryBuilder<TSchema>

  nor: (
    conditions?: FilterQuery<TSchema> | Array<FilterQuery<TSchema>>
  ) => IQueryBuilder<TSchema>

  build: () => any
}
