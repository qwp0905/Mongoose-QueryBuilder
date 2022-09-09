import { IBulkBuilder } from '@interface'
import { Bulk } from '@type'

export const BulkBuilder = <T>(): IBulkBuilder<T> => {
  const bulk: Bulk<T>[] = []
  return {
    insertOne(document: T) {
      bulk.push({ insertOne: { document } })
      return this
    },
    replaceOne(filter, replacement, upsert?, collation?, hint?) {
      bulk.push({
        replaceOne: { filter, replacement, upsert, collation, hint }
      })
      return this
    },
    updateOne(filter, update, arrayFilters?, upsert?, collation?, hint?) {
      bulk.push({
        updateOne: { filter, update, arrayFilters, upsert, collation, hint }
      })
      return this
    },
    updateMany(filter, update, arrayFilters?, upsert?, collation?, hint?) {
      bulk.push({
        updateMany: { filter, update, arrayFilters, upsert, collation, hint }
      })
      return this
    },
    deleteOne(filter, collation?, hint?) {
      bulk.push({ deleteOne: { filter, collation, hint } })
      return this
    },
    deleteMany(filter, collation?, hint?) {
      bulk.push({ deleteMany: { filter, collation, hint } })
      return this
    },
    build() {
      return bulk
    }
  }
}
