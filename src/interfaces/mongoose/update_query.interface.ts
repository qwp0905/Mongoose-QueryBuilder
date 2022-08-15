import { FilterQuery, QueryKey, QueryValue } from '@type'
import { IPushQuery } from '@interface'

export interface IUpdateQuery<TSchema> {
  $set?: {
    [P in QueryKey<Omit<TSchema, '_id'>>]?: QueryValue<Omit<TSchema, '_id'>, P>
  }

  $unset?: { [P in QueryKey<Omit<TSchema, '_id'>>]?: 1 }

  $push?: {
    [P in QueryKey<Omit<TSchema, '_id'>>]?: QueryValue<
      Omit<TSchema, '_id'>,
      P
    > extends Array<infer U>
      ? U | IPushQuery<U>
      : never
  }

  $pull?: { [P in QueryKey<Omit<TSchema, '_id'>>]?: FilterQuery<TSchema> }

  $pop?: {
    [P in QueryKey<Omit<TSchema, '_id'>>]?: QueryValue<
      Omit<TSchema, '_id'>,
      P
    > extends any[]
      ? 1 | -1
      : never
  }
}
