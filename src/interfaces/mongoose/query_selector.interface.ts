import { FilterQuery, NotObject } from '@type'

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
  $not?: T extends string ? IQuerySelector<T> | RegExp : IQuerySelector<T>
  // Element
  $exists?: boolean
  $regex?: T extends string ? RegExp | string : never
  $all?: T extends Array<infer U> ? U[] : never
  $elemMatch?: T extends Array<infer U>
    ? U extends NotObject
      ? U extends Array<infer K>
        ? { $size?: number; $all?: K[]; $elemMatch?: any }
        : IQuerySelector<U>
      : FilterQuery<U>
    : never
  $size?: T extends any[] ? number : never
}

export interface IRootQuerySelector<TSchema> {
  $and?: Array<FilterQuery<TSchema>>
  $nor?: Array<FilterQuery<TSchema>>
  $or?: Array<FilterQuery<TSchema>>
  $text?: {
    $search: string
    $language?: string
    $caseSensitive?: boolean
    $diacriticSensitive?: boolean
  }
  $where?: string | ((...arg: any[]) => any)
  $comment?: string
}
