export class ToolAlreadyExistsError extends Error {
  constructor () {
    super('The received tool already exists')
    this.name = 'ToolAlreadyExistsError'
  }
}
