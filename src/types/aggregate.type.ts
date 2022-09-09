import { PipelineStage } from '@interface'

export type AggregateOperator =
  | PipelineStage.IAddFields
  | PipelineStage.IBucket
  | PipelineStage.IBucketAuto
  | PipelineStage.ICollStats
  | PipelineStage.ICount
  | PipelineStage.IFacet
  | PipelineStage.IGeoNear
  | PipelineStage.IGraphLookup
  | PipelineStage.IGroup
  | PipelineStage.IIndexStats
  | PipelineStage.ILimit
  | PipelineStage.IListSessions
  | PipelineStage.ILookup
  | PipelineStage.IMatch
  | PipelineStage.IMerge
  | PipelineStage.IOut
  | PipelineStage.IPlanCacheStats
  | PipelineStage.IProject
  | PipelineStage.IRedact
  | PipelineStage.IReplaceRoot
  | PipelineStage.IReplaceWith
  | PipelineStage.ISample
  | PipelineStage.ISearch
  | PipelineStage.ISet
  // | PipelineStage.ISetWindowFields
  | PipelineStage.ISkip
  | PipelineStage.ISort
  | PipelineStage.ISortByCount
  | PipelineStage.IUnionWith
  | PipelineStage.IUnset
  | PipelineStage.IUnwind
