import {
  AllOperator,
  ElemMatchOperator,
  FilterQuery,
  NotOperator,
  RegexOperator,
  SizeOperator
} from '@type'

export interface IQuerySelector<T> {
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

export interface IArrayQuerySelector<T> {
  $all?: AllOperator<T>
  $elemMatch?: ElemMatchOperator<T>
  $size?: SizeOperator<T>
}

export interface IRootQuerySelector<TSchema> {
  $and?: Array<FilterQuery<TSchema>>
  $nor?: Array<FilterQuery<TSchema>>
  $or?: Array<FilterQuery<TSchema>>
  // $text?: {
  //   $search: string
  //   $language?: string
  //   $caseSensitive?: boolean
  //   $diacriticSensitive?: boolean
  // }
  // $where?: string | ((...arg: any[]) => any)
  // $comment?: string
}
