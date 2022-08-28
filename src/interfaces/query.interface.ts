import {
  QueryKey,
  QueryValue,
  FilterQuery,
  NotOperator,
  RegexOperator,
  AllOperator,
  SizeOperator,
  ElemMatchOperator
} from '@type'

export interface IQueryBuilder<TSchema> {
  eq: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  not: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: NotOperator<QueryValue<TSchema, Keys>>
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
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends string ? P : never
    }[Keys],
    value?: RegexOperator<QueryValue<TSchema, Keys>>
  ) => IQueryBuilder<TSchema>

  in: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>[]
  ) => IQueryBuilder<TSchema>

  ne: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>
  ) => IQueryBuilder<TSchema>

  nin: <Keys extends QueryKey<TSchema>>(
    key: Keys,
    value?: QueryValue<TSchema, Keys>[]
  ) => IQueryBuilder<TSchema>

  all: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: AllOperator<QueryValue<TSchema, Keys>>
  ) => IQueryBuilder<TSchema>

  size: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: SizeOperator<QueryValue<TSchema, Keys>>
  ) => IQueryBuilder<TSchema>

  elemMatch: <Keys extends QueryKey<TSchema>>(
    key: {
      [P in Keys]: QueryValue<TSchema, P> extends any[] ? P : never
    }[Keys],
    value?: ElemMatchOperator<QueryValue<TSchema, Keys>>
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
