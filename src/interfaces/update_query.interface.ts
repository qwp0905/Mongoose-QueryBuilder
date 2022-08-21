import { PopOperator, QueryKey, QueryValue } from '@type'
import { IUpdateQuery } from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: IUpdateQuery<TSchema>['$set'][Keys]
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
    value?: IUpdateQuery<TSchema>['$push'][Keys]
  ) => IUpdateQueryBuilder<TSchema>

  pop: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value?: PopOperator<Omit<TSchema, '_id'>>[Keys]
  ) => IUpdateQueryBuilder<TSchema>

  pull: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value: IUpdateQuery<TSchema>['$pull'][Keys]
  ) => IUpdateQueryBuilder<TSchema>

  inc: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends number
        ? P
        : never
    }[Keys],
    value: IUpdateQuery<TSchema>['$inc'][Keys]
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}
