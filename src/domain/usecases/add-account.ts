export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<void>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
  }
}
