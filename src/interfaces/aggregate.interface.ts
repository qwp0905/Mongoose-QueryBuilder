import { FilterQuery, QueryKey } from '@type'

export interface IAggregateBuilder<T> {
  match: (query: FilterQuery<T>) => IAggregateBuilder<T>
  addFields: <M extends QueryKey<T>, P extends string>(
    options: P extends M ? never : Record<P, Fields<T>>
  ) => IAggregateBuilder<T>
}

interface Fields<T> {
  $sum?: `$${QueryKey<T>}` | number | Array<`$${QueryKey<T>}` | number>
  $add?: `$${QueryKey<T>}`[]
}
