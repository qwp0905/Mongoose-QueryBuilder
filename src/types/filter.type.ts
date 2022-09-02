import { IQuerySelector, IRootQuerySelector, ISelector } from '@interface'
import { NotObject, QueryKey, QueryValue } from '@type'

export type FilterQuery<TSchema> = IRootQuerySelector<TSchema> & {
  [P in QueryKey<TSchema>]?:
    | (QueryValue<TSchema, P> extends unknown[]
        ? ISelector<QueryValue<TSchema, P>>
        : IQuerySelector<QueryValue<TSchema, P>>)
    | QueryValue<TSchema, P>
}

export type ElemMatchOperator<T> = T extends (infer U)[]
  ? U extends NotObject
    ? IQuerySelector<U>
    : FilterQuery<U>
  : never

export type AllOperator<T> = T extends (infer U)[] ? U[] : never

export type SizeOperator<T> = T extends unknown[] ? number : never

export type NotOperator<T> = T extends string
  ? IQuerySelector<T> | RegExp
  : IQuerySelector<T>

export type RegexOperator<T> = T extends string ? RegExp | string : never
