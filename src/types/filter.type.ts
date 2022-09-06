import { IQueryOperator, IRootQueryOperator, IOperator } from '@interface'
import { NotObject, QueryKey, QueryValue } from '@type'

export type FilterQuery<TSchema> = IRootQueryOperator<TSchema> & {
  [P in QueryKey<TSchema>]?:
    | (QueryValue<TSchema, P> extends unknown[]
        ? IOperator<QueryValue<TSchema, P>>
        : IQueryOperator<QueryValue<TSchema, P>>)
    | QueryValue<TSchema, P>
}

export type ElemMatchOperator<T> = T extends (infer U)[]
  ? U extends NotObject
    ? IQueryOperator<U>
    : FilterQuery<U>
  : never

export type AllOperator<T> = T extends (infer U)[] ? U[] : never

export type SizeOperator<T> = T extends unknown[] ? number : never

export type NotOperator<T> = T extends string
  ? IQueryOperator<T> | RegExp
  : FilterQuery<T>

export type RegexOperator<T> = T extends string ? RegExp | string : never
