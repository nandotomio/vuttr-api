import { AddTool } from '@/domain/usecases'

export interface AddToolRepository {
  add: (data: AddToolRepository.Params) => Promise<AddToolRepository.Result>
}

export namespace AddToolRepository {
  export type Params = AddTool.Params
  export type Result = AddTool.Result
}
