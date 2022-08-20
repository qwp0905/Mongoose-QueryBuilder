import { IArrayQuerySelector, IPushQuery, IQuerySelector } from '@interface'
import { QueryKey, QueryValue, NotObject, FilterQuery } from '@type'

export type SetOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P>
}

export type UnsetOperator<T> = {
  [P in QueryKey<T>]?: 1
}

export type PushOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends Array<infer U>
    ? U | IPushQuery<U>
    : never
}

export type SortOperator<T> = T extends NotObject
  ? T extends any[]
    ? never
    : 1 | -1
  : { [P in QueryKey<T>]?: 1 | -1 }

export type PullOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends Array<infer U>
    ? U extends NotObject
      ? IQuerySelector<U>
      : U extends Array<infer K>
      ? IArrayQuerySelector<K[]> & IQuerySelector<K[]>
      : FilterQuery<U>
    : never
}

export type PopOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends any[] ? 1 | -1 : never
}
