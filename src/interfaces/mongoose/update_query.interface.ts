import {
  AddToSetOperator,
  IncOperator,
  PopOperator,
  PullOperator,
  PushOperator,
  SetOperator,
  SortOperator,
  UnsetOperator
} from '@type'

export interface IUpdateQuery<TSchema> extends IArrayUpdateOperator<TSchema> {
  $set?: SetOperator<Omit<TSchema, '_id'>>

  $unset?: UnsetOperator<Omit<TSchema, '_id'>>

  $inc?: IncOperator<Omit<TSchema, '_id'>>
}

export interface IArrayUpdateOperator<TSchema> {
  $push?: PushOperator<Omit<TSchema, '_id'>>

  $pull?: PullOperator<Omit<TSchema, '_id'>>

  $pop?: PopOperator<Omit<TSchema, '_id'>>

  $addToSet?: AddToSetOperator<Omit<TSchema, '_id'>>
}

export interface IPushQuery<T> {
  $slice?: number
  $each: T[]
  $sort?: SortOperator<T>
  $position?: number
}
