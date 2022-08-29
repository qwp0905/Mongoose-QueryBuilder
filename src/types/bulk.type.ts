import {
  IDeleteManyOption,
  IDeleteOneOption,
  IInsertOneOption,
  IReplaceOneOption,
  IUpdateManyOption,
  IUpdateOneOption
} from '@interface'

export type Bulk<TSchema> =
  | {
      insertOne: IInsertOneOption<TSchema>
    }
  | {
      replaceOne: IReplaceOneOption<TSchema>
    }
  | {
      updateOne: IUpdateOneOption<TSchema>
    }
  | {
      updateMany: IUpdateManyOption<TSchema>
    }
  | {
      deleteOne: IDeleteOneOption<TSchema>
    }
  | {
      deleteMany: IDeleteManyOption<TSchema>
    }
