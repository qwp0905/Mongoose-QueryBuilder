import {
  PopOperator,
  PullOperator,
  PushOperator,
  SetOperator,
  SortOperator,
  UnsetOperator
} from '@type'

export interface IUpdateQuery<TSchema> {
  $set?: SetOperator<Omit<TSchema, '_id'>>

  $unset?: UnsetOperator<Omit<TSchema, '_id'>>

  $push?: PushOperator<Omit<TSchema, '_id'>>

  $pull?: PullOperator<Omit<TSchema, '_id'>>

  $pop?: PopOperator<Omit<TSchema, '_id'>>
}

export interface IPushQuery<T> {
  $slice?: number
  $each: Array<T>
  $sort?: SortOperator<T>
  $position?: number
}
