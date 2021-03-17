export interface CheckToolByTitleRepository {
  checkByTitle: (title: string) => Promise<void>
}
