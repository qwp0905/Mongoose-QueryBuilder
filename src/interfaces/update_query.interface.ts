import {
  AddToSetOperator,
  IncOperator,
  PopOperator,
  PullOperator,
  PushOperator,
  QueryKey,
  QueryValue,
  SetOperator
} from '@type'
import { IUpdateQuery } from '@interface'

export interface IUpdateQueryBuilder<TSchema> {
  set: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: Keys,
    value?: SetOperator<Omit<TSchema, '_id'>>
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
    value?: PushOperator<Omit<TSchema, '_id'>>
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
    value: PullOperator<Omit<TSchema, '_id'>>
  ) => IUpdateQueryBuilder<TSchema>

  inc: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends number
        ? P
        : never
    }[Keys],
    value: IncOperator<Omit<TSchema, '_id'>>
  ) => IUpdateQueryBuilder<TSchema>

  addToSet: <Keys extends QueryKey<Omit<TSchema, '_id'>>>(
    key: {
      [P in Keys]: QueryValue<Omit<TSchema, '_id'>, Keys> extends any[]
        ? P
        : never
    }[Keys],
    value?: AddToSetOperator<Omit<TSchema, '_id'>>
  ) => IUpdateQueryBuilder<TSchema>

  build: () => IUpdateQuery<TSchema>
}
