import { FilterQuery, QueryKey } from '@type'

export interface IAddFields<TSchema> {
  $addFields: Record<string, any>
}

export interface IBucket<TSchema> {
  groupBy: `$${QueryKey<TSchema>}`
  boundaries: number[]
  default: any
  output: Record<string, any>
}

export interface IMatch<TSchema> {
  $match: FilterQuery<TSchema>
}
