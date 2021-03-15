import { getConnectionOptions, ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const ormConfig = async (): Promise<ConnectionOptions> => ({
  ...await getConnectionOptions(),
  namingStrategy: new SnakeNamingStrategy()
})
