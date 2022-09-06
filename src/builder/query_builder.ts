import {
  IArrayOperator,
  IQueryBuilder,
  IQueryOperator,
  ILogicalOperator
} from '@interface'
import { FilterQuery, QueryKey } from '@type'

export const QueryBuilder = <T>(): IQueryBuilder<T> => {
  let query: FilterQuery<T> = {}

  const setKey = <Keys extends QueryKey<T>>(
    key: Keys,
    tag: keyof IQueryOperator<unknown> | keyof IArrayOperator<unknown>,
    value: unknown
  ) => {
    if (value === undefined) return

    if (Array.isArray(value) && !value.length) return

    if (!query[key]) query[key] = {} as FilterQuery<T>[Keys]

    if (!query[key][tag]) {
      query[key][tag] = value
    }
  }

  const setCondition = (
    tag: keyof ILogicalOperator<T>,
    condition?: FilterQuery<T> | FilterQuery<T>[]
  ) => {
    if (!condition || !Object.keys(condition).length) return

    if (!query[tag]) query[tag] = []

    if (Array.isArray(condition)) {
      query[tag] = [...query[tag], ...condition]
    } else {
      query[tag].push(condition)
    }
  }
  return {
    eq(key, value) {
      if (value === undefined) return this
      if (Array.isArray(value) && !value.length) return this
      query = { ...query, [key]: value }
      return this
    },
    not(key, value) {
      setKey(key, '$not', value)
      return this
    },
    gt(key, value) {
      setKey(key, '$gt', value)
      return this
    },
    gte(key, value) {
      setKey(key, '$gte', value)
      return this
    },
    lt(key, value) {
      setKey(key, '$lt', value)
      return this
    },
    lte(key, value) {
      setKey(key, '$lte', value)
      return this
    },
    exists(key, value) {
      setKey(key, '$exists', value)
      return this
    },
    regex(key, pattern) {
      setKey(key, '$regex', pattern)
      return this
    },
    in(key, value) {
      setKey(key, '$in', value)
      return this
    },
    ne(key, value) {
      setKey(key, '$ne', value)
      return this
    },
    nin(key, value) {
      setKey(key, '$nin', value)
      return this
    },
    all(key, value) {
      setKey(key, '$all', value)
      return this
    },
    size(key, value) {
      setKey(key, '$size', value)
      return this
    },
    elemMatch(key, value) {
      setKey(key, '$elemMatch', value)
      return this
    },
    or(conditions) {
      setCondition('$or', conditions)
      return this
    },
    and(conditions) {
      setCondition('$and', conditions)
      return this
    },
    nor(conditions) {
      setCondition('$nor', conditions)
      return this
    },
    text($search, $language?, $caseSensitive?, $diacriticSensitive?) {
      if (!$search) {
        return this
      }

      query.$text = { $search, $caseSensitive, $diacriticSensitive, $language }
      return this
    },
    build() {
      return query
    }
  }
}
