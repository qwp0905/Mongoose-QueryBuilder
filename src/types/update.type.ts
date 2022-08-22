import {
  IPushQuery,
  IQuerySelector,
  IRootQuerySelector,
  ISelector
} from '@interface'
import { QueryKey, QueryValue, NotObject } from '@type'

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
  ? 1 | -1
  : T extends any[]
  ? never
  : { [P in QueryKey<T>]?: 1 | -1 }

export type PullOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends Array<infer U>
    ? U extends NotObject
      ? IQuerySelector<U>
      : IRootQuerySelector<U> & {
          [K in QueryKey<U>]?: ISelector<QueryValue<U, K>>
        }
    : never
}

export type PopOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends any[] ? 1 | -1 : never
}

export type IncOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends number ? number : never
}
