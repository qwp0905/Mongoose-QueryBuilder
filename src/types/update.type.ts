import { IPushQuery } from '@interface'
import { QueryKey, QueryValue, NotObject, FilterQuery } from '@type'

export type SetOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P>
}

export type UnsetOperator<T> = {
  [P in QueryKey<T>]?: 1
}

export type PushOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends (infer U)[]
    ? U | IPushQuery<U>
    : never
}

export type AddToSetOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends (infer U)[]
    ? U | { $each: U[] }
    : never
}

export type SortOperator<T> = T extends NotObject
  ? 1 | -1
  : T extends any[]
  ? never
  : { [P in QueryKey<T>]?: 1 | -1 }

export type PullOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends (infer U)[]
    ? U | FilterQuery<U>
    : never
}

export type PopOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends any[] ? 1 | -1 : never
}

export type IncOperator<T> = {
  [P in QueryKey<T>]?: QueryValue<T, P> extends number ? number : never
}
