export interface AddTool {
  add: (data: AddTool.Params) => Promise<AddTool.Result>
}

export namespace AddTool {
  export type Params = {
    title: string
    link: string
    description: string
    tags: string[]
  }

  export type Result = {
    id: string
    title: string
    link: string
    description: string
    tags: string[]
  }
}
