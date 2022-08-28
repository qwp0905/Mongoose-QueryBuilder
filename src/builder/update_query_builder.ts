import { IUpdateQuery, IUpdateQueryBuilder } from '@interface'

export const UpdateQueryBuilder = <T>(): IUpdateQueryBuilder<T> => {
  const query: IUpdateQuery<T> = {}
  return {
    set(key, value) {
      if (
        value === undefined ||
        (typeof value === 'object' && !Object.keys(value).length)
      ) {
        return this
      }
      if (!query.$set) query.$set = {}
      query.$set = { ...query.$set, [key]: value }
      return this
    },
    unset(key) {
      if (!query.$unset) query.$unset = {}
      query.$unset[key] = 1
      return this
    },
    push(key, value) {
      if (value === undefined) {
        return this
      }
      if (!query.$push) query.$push = {}
      query.$push = { ...query.$push, [key]: value }
      return this
    },
    pop(key, value) {
      if (!value) {
        return this
      }
      if (!query.$pop) query.$pop = {}
      query.$pop = { ...query.$pop, [key]: value }
      return this
    },
    pull(key, value) {
      if (!value || (typeof value === 'object' && !Object.keys(value).length)) {
        return this
      }
      if (!query.$pull) query.$pull = {}
      query.$pull = { ...query.$pull, [key]: value }
      return this
    },
    inc(key, value) {
      if (!query.$inc) query.$inc = {}
      query.$inc = { ...query.$inc, [key]: value }

      return this
    },
    addToSet(key, value) {
      if (!query.$addToSet) query.$inc = {}
      if (value === undefined) return this
      query.$addToSet = { ...query.$addToSet, [key]: value }
    },
    build() {
      return query
    }
  }
}
