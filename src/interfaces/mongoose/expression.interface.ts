import { QueryKey } from '@type'

export interface Expression<TSchema> {
  $sum?: number | `$${QueryKey<TSchema>}`
  $push?: any
  $avg?: string
}
