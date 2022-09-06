import {
  AllOperator,
  ElemMatchOperator,
  FilterQuery,
  NotOperator,
  RegexOperator,
  SizeOperator
} from '@type'

export interface IOperator<T> extends IQueryOperator<T>, IArrayOperator<T> {}

export interface IQueryOperator<T> {
  // Comparison
  $eq?: T
  $gt?: T
  $gte?: T
  $in?: T[]
  $lt?: T
  $lte?: T
  $ne?: T
  $nin?: T[]
  // Logical
  $not?: NotOperator<T>
  // Element
  $exists?: boolean
  $regex?: RegexOperator<T>
}

export interface IArrayOperator<T> {
  $all?: AllOperator<T>
  $elemMatch?: ElemMatchOperator<T>
  $size?: SizeOperator<T>
}

export interface IRootQueryOperator<TSchema> extends ILogicalOperator<TSchema> {
  $text?: {
    $search: string
    $language?: string
    $caseSensitive?: boolean
    $diacriticSensitive?: boolean
  }
  $where?: string | ((this: TSchema) => boolean)
  $comment?: string
}

export interface ILogicalOperator<TSchema> {
  $and?: FilterQuery<TSchema>[]
  $nor?: FilterQuery<TSchema>[]
  $or?: FilterQuery<TSchema>[]
}
