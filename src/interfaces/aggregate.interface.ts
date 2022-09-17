import { AggregateOperator, FilterQuery } from '@type'

export interface IAggregateBuilder {
  addFields: ($addFields: Record<string, any>) => this

  bucket: (
    groupBy: any,
    boundaries: any[],
    _default?: any,
    output?: Record<string, any>
  ) => this

  bucketAuto: (
    groupBy: any,
    buckets: number,
    output: Record<string, any>,
    granularity?:
      | 'R5'
      | 'R10'
      | 'R20'
      | 'R40'
      | 'R80'
      | '1-2-5'
      | 'E6'
      | 'E12'
      | 'E24'
      | 'E48'
      | 'E96'
      | 'E192'
      | 'POWERSOF2'
  ) => this

  collStats: (
    latencyStats?: { histograms?: boolean },
    storageStats?: { scale?: number },
    count?: Record<string | number | symbol, never>,
    queryExecStats?: Record<string | number | symbol, never>
  ) => this

  count: ($count: string) => this

  facet: ($facet: Record<string, any[]>) => this

  geoNear: (
    near: { type: 'Point'; coordinates: [number, number] } | [number, number],
    distanceField: string,
    distanceMultiplier?: number,
    includeLocs?: string,
    key?: string,
    maxDistance?: number,
    minDistance?: number,
    query?: any,
    spherical?: boolean,
    uniqueDocs?: boolean
  ) => this

  graphLookup: (
    from: string,
    startWith: any,
    connectFromField: string,
    connectToField: string,
    as: string,
    maxDepth?: number,
    depthField?: string,
    restrictSearchWithMatch?: any
  ) => this

  group: ($group: { _id: any } | { [key: string]: any }) => this

  indexStats: () => this

  limit: ($limit: number) => this

  listSessions: (
    $listSessions:
      | { users?: { user: string; db: string }[] }
      | { allUsers?: true }
  ) => this

  lookup: (
    from: string,
    as: string,
    localField?: string,
    foreignField?: string,
    _let?: Record<string, any>,
    pipeline?: any[]
  ) => this

  match: ($match: FilterQuery<any>) => this

  merge: (
    into: string | { db: string; coll: string },
    on?: string | string[],
    _let?: Record<string, any>,
    whenMatched?: 'replace' | 'keepExisting' | 'merge' | 'fail' | any[],
    whenNotMatched?: 'insert' | 'discard' | 'fail'
  ) => this

  out: ($out: string | { db: string; coll: string }) => this

  planCacheStats: () => this

  project: ($project: Record<string, 1 | 0>) => this

  redact: ($redact: any) => this

  replaceRoot: (newRoot: any) => this

  replaceWith: ($replaceWith: any) => this

  sample: (size: number) => this

  search: (
    search: { [operator: string]: any },
    index?: string,
    highlight?: {
      path: string | string[] | { value: string; multi: string }
      maxCharsToExamine?: number
      maxNumPassages?: number
    }
  ) => this

  set: ($set: Record<string, any>) => this

  // setWindowFields: (
  //   output: Record<
  //     string,
  //     Record<string, any> & {
  //       window?: {
  //         documents?: [string | number, string | number]
  //         range?: [string | number, string | number]
  //         unit?:
  //           | 'year'
  //           | 'quarter'
  //           | 'month'
  //           | 'week'
  //           | 'day'
  //           | 'hour'
  //           | 'minute'
  //           | 'second'
  //           | 'millisecond'
  //       }
  //     }
  //   >,
  //   partitionBy?: any,
  //   sortBy?: Record<string, 1 | -1>
  // ) => this

  skip: ($skip: number) => this

  sort: ($sort: Record<string, 1 | -1>) => this

  sortByCount: ($sortByCount: any) => this

  unionWith: ($unionWith: string | { coll: string; pipeline?: any[] }) => this

  unset: ($unset: string | string[]) => this

  unwind: (
    $unwind:
      | string
      | {
          path: string
          includeArrayIndex?: string
          preserveNullAndEmptyArrays?: boolean
        }
  ) => this

  build: () => AggregateOperator[]
}
