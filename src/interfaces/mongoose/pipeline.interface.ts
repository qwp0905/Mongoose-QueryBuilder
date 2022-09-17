import { FilterQuery } from '@type'

export interface IAddFields {
  $addFields: Record<string, any>
}

export interface IBucket {
  $bucket: {
    groupBy: any
    boundaries: any[]
    default?: any
    output?: Record<string, any>
  }
}

export interface IBucketAuto {
  $bucketAuto: {
    groupBy: any
    buckets: number
    output?: Record<string, any>
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
  }
}

export interface ICollStats {
  $collStats: {
    latencyStats?: { histograms?: boolean }
    storageStats?: { scale?: number }
    count?: Record<string | number | symbol, never>
    queryExecStats?: Record<string | number | symbol, never>
  }
}

export interface ICount {
  $count: string
}

export interface IFacet {
  $facet: Record<string, any[]>
}

export interface IGeoNear {
  $geoNear: {
    near: { type: 'Point'; coordinates: [number, number] } | [number, number]
    distanceField: string
    distanceMultiplier?: number
    includeLocs?: string
    key?: string
    maxDistance?: number
    minDistance?: number
    query?: any
    spherical?: boolean
    uniqueDocs?: boolean
  }
}

export interface IGraphLookup {
  $graphLookup: {
    from: string
    startWith: any
    connectFromField: string
    connectToField: string
    as: string
    maxDepth?: number
    depthField?: string
    restrictSearchWithMatch?: any
  }
}

export interface IGroup {
  $group: { _id: any } | { [key: string]: any }
}

export interface IIndexStats {
  $indexStats: Record<string | number | symbol, never>
}

export interface ILimit {
  $limit: number
}

export interface IListSessions {
  $listSessions:
    | { users?: { user: string; db: string }[] }
    | { allUsers?: true }
}

export interface ILookup {
  $lookup: {
    from: string
    as: string
    localField?: string
    foreignField?: string
    let?: Record<string, any>
    pipeline?: any[]
  }
}

export interface IMatch {
  $match: FilterQuery<any>
}

export interface IMerge {
  $merge: {
    into: string | { db: string; coll: string }
    on?: string | string[]
    let?: Record<string, any>
    whenMatched?: 'replace' | 'keepExisting' | 'merge' | 'fail' | any[]
    whenNotMatched?: 'insert' | 'discard' | 'fail'
  }
}

export interface IOut {
  $out: string | { db: string; coll: string }
}

export interface IPlanCacheStats {
  $planCacheStats: Record<string | number | symbol, never>
}

export interface IProject {
  $project: {
    [field: string]: any
  }
}

export interface IRedact {
  $redact: any
}

export interface IReplaceRoot {
  $replaceRoot: { newRoot: any }
}

export interface IReplaceWith {
  $replaceWith: any
}

export interface ISample {
  $sample: { size: number }
}

export interface ISearch {
  $search: {
    index?: string
    highlight?: {
      path: string | string[] | { value: string; multi: string }
      maxCharsToExamine?: number
      maxNumPassages?: number
    }
    [operator: string]: any
  }
}

export interface ISet {
  $set: Record<string, any>
}

// export interface ISetWindowFields {
//   $setWindowFields: {
//     partitionBy?: any
//     sortBy?: Record<string, 1 | -1>
//     output: Record<
//       string,
//       Record<string, any> & {
//         window?: {
//           documents?: [string | number, string | number]
//           range?: [string | number, string | number]
//           unit?:
//             | 'year'
//             | 'quarter'
//             | 'month'
//             | 'week'
//             | 'day'
//             | 'hour'
//             | 'minute'
//             | 'second'
//             | 'millisecond'
//         }
//       }
//     >
//   }
// }

export interface ISkip {
  $skip: number
}

export interface ISort {
  $sort: Record<string, 1 | -1>
}

export interface ISortByCount {
  $sortByCount: any
}

export interface IUnionWith {
  $unionWith:
    | string
    | {
        coll: string
        pipeline?: any[]
      }
}

export interface IUnset {
  $unset: string | string[]
}

export interface IUnwind {
  $unwind:
    | string
    | {
        path: string
        includeArrayIndex?: string
        preserveNullAndEmptyArrays?: boolean
      }
}
