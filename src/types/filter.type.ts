import {
  IArrayQuerySelector,
  IQuerySelector,
  IRootQuerySelector
} from '@interface'
import { NotObject, QueryKey, QueryValue } from '@type'

export type FilterQuery<TSchema> = IRootQuerySelector<TSchema> & {
  [P in QueryKey<TSchema>]?:
    | (QueryValue<TSchema, P> extends any[]
        ? IArrayQuerySelector<QueryValue<TSchema, P>> &
            IQuerySelector<QueryValue<TSchema, P>>
        : IQuerySelector<QueryValue<TSchema, P>>)
    | QueryValue<TSchema, P>
}

export type ElemMatchOperator<T> = T extends Array<infer U>
  ? U extends NotObject
    ? IQuerySelector<U>
    : U extends Array<infer P>
    ? IArrayQuerySelector<P[]> & IQuerySelector<P[]>
    : FilterQuery<U>
  : never

export type AllOperator<T> = T extends Array<infer U> ? U[] : never

export type SizeOperator<T> = T extends any[] ? number : never

export type NotOperator<T> = T extends string
  ? IQuerySelector<T> | RegExp
  : T extends any[]
  ? IQuerySelector<T> & IArrayQuerySelector<T>
  : IQuerySelector<T>

export type RegexOperator<T> = T extends string ? RegExp | string : never
