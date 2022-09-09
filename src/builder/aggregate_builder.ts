import { IAggregateBuilder } from '@interface'
import { AggregateOperator } from '@type'

export const AggregateBuilder = (): IAggregateBuilder => {
  const pipeline: AggregateOperator[] = []
  return {
    addFields($addFields) {
      pipeline.push({ $addFields })
      return this
    },
    bucket(groupBy, boundaries, _default?, output?) {
      pipeline.push({
        $bucket: {
          groupBy,
          boundaries,
          default: _default,
          output
        }
      })
      return this
    },
    bucketAuto(groupBy, buckets, output, granularity?) {
      pipeline.push({
        $bucketAuto: {
          groupBy,
          buckets,
          granularity,
          output
        }
      })
      return this
    },
    collStats(latencyStats?, storageStats?, count?, queryExecStats?) {
      pipeline.push({
        $collStats: { latencyStats, storageStats, count, queryExecStats }
      })
      return this
    },
    count($count) {
      pipeline.push({ $count })
      return this
    },
    facet($facet) {
      pipeline.push({ $facet })
      return this
    },
    geoNear(
      near,
      distanceField,
      distanceMultiplier?,
      includeLocs?,
      key?,
      maxDistance?,
      minDistance?,
      query?,
      spherical?,
      uniqueDocs?
    ) {
      pipeline.push({
        $geoNear: {
          near,
          distanceField,
          distanceMultiplier,
          includeLocs,
          key,
          maxDistance,
          minDistance,
          query,
          spherical,
          uniqueDocs
        }
      })
      return this
    },
    graphLookup(
      from,
      startWith,
      connectFromField,
      connectToField,
      as,
      maxDepth?,
      depthField?,
      restrictSearchWithMatch?
    ) {
      pipeline.push({
        $graphLookup: {
          from,
          startWith,
          connectFromField,
          connectToField,
          as,
          maxDepth,
          depthField,
          restrictSearchWithMatch
        }
      })
      return this
    },
    group($group) {
      pipeline.push({ $group })
      return this
    },
    indexStats() {
      pipeline.push({ $indexStats: {} })
      return this
    },
    limit($limit) {
      pipeline.push({ $limit })
      return this
    },
    listSessions($listSessions) {
      pipeline.push({ $listSessions })
      return this
    },
    lookup(from, as, localField?, foreignField?, _let?, pipeline?) {
      pipeline.push({
        $lookup: { from, as, localField, foreignField, _let, pipeline }
      })
      return this
    },
    match($match) {
      pipeline.push({ $match })
      return this
    },
    merge(into, on?, _let?, whenMatched?, whenNotMatched?) {
      pipeline.push({
        $merge: { into, on, let: _let, whenMatched, whenNotMatched }
      })
      return this
    },
    out($out) {
      pipeline.push({ $out })
      return this
    },
    planCacheStats() {
      pipeline.push({ $planCacheStats: {} })
      return this
    },
    project($project) {
      pipeline.push({ $project })
      return this
    },
    redact($redact) {
      pipeline.push({ $redact })
      return this
    },
    replaceRoot(newRoot) {
      pipeline.push({ $replaceRoot: { newRoot } })
      return this
    },
    replaceWith($replaceWith) {
      pipeline.push({ $replaceWith })
      return this
    },
    sample(size) {
      pipeline.push({ $sample: { size } })
      return this
    },
    search(search, index?, highlight?) {
      pipeline.push({ $search: { ...search, index, highlight } })
      return this
    },
    set($set) {
      pipeline.push({ $set })
      return this
    },
    skip($skip) {
      pipeline.push({ $skip })
      return this
    },
    sort($sort) {
      pipeline.push({ $sort })
      return this
    },
    sortByCount($sortByCount) {
      pipeline.push({ $sortByCount })
      return this
    },
    unionWith($unionWith) {
      pipeline.push({ $unionWith })
      return this
    },
    unset($unset) {
      pipeline.push({ $unset })
      return this
    },
    unwind($unwind) {
      pipeline.push({ $unwind })
      return this
    },
    build() {
      return pipeline
    }
  }
}
