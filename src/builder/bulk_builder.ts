import { IBulkBuilder } from '@interface'
import { Bulk } from '@type'

export const BulkBuilder = <T>(): IBulkBuilder<T> => {
  const bulk: Bulk<T>[] = []
  return {
    insertOne(document: T) {
      bulk.push({ insertOne: { document } })
      return this
    },
    replaceOne(options) {
      bulk.push({ replaceOne: options })
      return this
    },
    updateOne(options) {
      bulk.push({ updateOne: options })
      return this
    },
    updateMany(options) {
      bulk.push({ updateMany: options })
      return this
    },
    deleteOne(options) {
      bulk.push({ deleteOne: options })
      return this
    },
    deleteMany(options) {
      bulk.push({ deleteMany: options })
      return this
    },
    build() {
      return bulk
    }
  }
}
