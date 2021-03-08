export interface CheckAccountByEmailRepository {
  checkByEmail: (email: string) => Promise<void>
}
