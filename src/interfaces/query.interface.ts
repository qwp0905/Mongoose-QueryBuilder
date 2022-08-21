import { QueryKey, QueryValue, FilterQuery } from '@type'
import { IQuerySelector, IArrayQuerySelector } from '@interface'

export interface IQueryBuilder<TSchema> {
  eq: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$eq']
  ) => IQueryBuilder<TSchema>

  not: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$not']
  ) => IQueryBuilder<TSchema>

  gt: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$gt']
  ) => IQueryBuilder<TSchema>

  gte: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$gte']
  ) => IQueryBuilder<TSchema>

  lt: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$lt']
  ) => IQueryBuilder<TSchema>

  lte: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$lte']
  ) => IQueryBuilder<TSchema>

  exists: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$exists']
  ) => IQueryBuilder<TSchema>

  regex: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends string ? P : never
    }[Keys],
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$regex']
  ) => IQueryBuilder<TSchema>

  in: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$in']
  ) => IQueryBuilder<TSchema>

  ne: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$ne']
  ) => IQueryBuilder<TSchema>

  nin: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: IQuerySelector<QueryValue<TSchema, Keys>>['$nin']
  ) => IQueryBuilder<TSchema>

  all: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: IArrayQuerySelector<QueryValue<TSchema, Keys>>['$all']
  ) => IQueryBuilder<TSchema>

  size: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: IArrayQuerySelector<QueryValue<TSchema, Keys>>['$size']
  ) => IQueryBuilder<TSchema>

  elemMatch: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: IArrayQuerySelector<QueryValue<TSchema, Keys>>['$elemMatch']
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

  build: () => FilterQuery<TSchema>
}
