import {
  IArrayQuerySelector,
  IQuerySelector,
  IRootQuerySelector
} from '@interface'
import { NotObject, QueryKey, QueryValue } from '@type'

export type FilterQuery<TSchema> = IRootQuerySelector<TSchema> & {
  [P in QueryKey<TSchema>]?: QueryValue<TSchema, P> extends any[]
    ? IArrayQuerySelector<QueryValue<TSchema, P>>
    : IQuerySelector<QueryValue<TSchema, P>> | QueryValue<TSchema, P>
}

export type ElemMatchOperator<T> = T extends Array<infer U>
  ? U extends NotObject
    ? U extends Array<infer K>
      ? IArrayQuerySelector<K[]>
      : IQuerySelector<U>
    : FilterQuery<U>
  : never

export type AllOperator<T> = T extends Array<infer U> ? U[] : never

export type SizeOperator<T> = T extends any[] ? number : never

export type NotOperator<T> = T extends string
  ? IQuerySelector<T> | RegExp
  : IQuerySelector<T>

export type RegexOperator<T> = T extends string ? RegExp | string : never
