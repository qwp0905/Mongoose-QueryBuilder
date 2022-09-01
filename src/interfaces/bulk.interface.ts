import { Bulk, FilterQuery } from '@type'
import { IUpdateQuery } from '@interface'

export interface ICollationOptions {
  locale: string
  strength?: number
  caseLevel?: boolean
  caseFirst?: string
  numericOrdering?: boolean
  alternate?: string
  maxVariable?: string
  backwards?: boolean
  normalization?: boolean
}

export interface IInsertOneOption<TSchema> {
  document: TSchema
}

export interface IReplaceOneOption<TSchema> {
  filter: FilterQuery<TSchema>
  replacement: Omit<TSchema, '_id'>
  collation?: ICollationOptions
  hint?: any
  upsert?: boolean
}

export interface IUpdateOneOption<TSchema> {
  filter: FilterQuery<TSchema>
  update: IUpdateQuery<TSchema>
  upsert?: boolean
  collation?: ICollationOptions
  arrayFilters?: any[]
  hint?: any
}

export interface IUpdateManyOption<TSchema> {
  filter: FilterQuery<TSchema>
  update: IUpdateQuery<TSchema>
  arrayFilters?: Document[]
  collation?: ICollationOptions
  hint?: any
  upsert?: boolean
}

export interface IDeleteOneOption<TSchema> {
  filter: FilterQuery<TSchema>
  collation?: ICollationOptions
  hint?: any
}

export interface IDeleteManyOption<TSchema> {
  filter: FilterQuery<TSchema>
  collation?: ICollationOptions
  hint?: any
}

export interface IBulkBuilder<TSchema> {
  insertOne: (document: TSchema) => IBulkBuilder<TSchema>
  replaceOne: (options: IReplaceOneOption<TSchema>) => IBulkBuilder<TSchema>
  updateOne: (options: IUpdateOneOption<TSchema>) => IBulkBuilder<TSchema>
  updateMany: (options: IUpdateManyOption<TSchema>) => IBulkBuilder<TSchema>
  deleteOne: (options: IDeleteOneOption<TSchema>) => IBulkBuilder<TSchema>
  deleteMany: (options: IDeleteManyOption<TSchema>) => IBulkBuilder<TSchema>
  build: () => any[] //! type does not match to mongodb package, specifically $set!
}
