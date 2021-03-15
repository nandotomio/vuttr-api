import 'reflect-metadata'
import 'module-alias/register'
import 'dotenv/config'

import env from '@/main/config/env'
import makeApp from '@/main/config/app'
import { ormConfig } from '@/main/config/typeorm'

import { createConnection, Connection } from 'typeorm'

import { Application } from 'express'
import { Server } from 'http'

export class ApiServer {
  private server: Server
  private dbConnection: Connection
  private app: Application

  public getApp (): Application {
    return this.app
  }

  public getDbConnection (): Connection {
    return this.dbConnection
  }

  public getServer (): Server {
    return this.server
  }

  public async init (): Promise<void> {
    this.dbConnection = await createConnection(await ormConfig())
    this.app = makeApp()
    this.server = this.app.listen(env.apiPort)
  }

  public async close (): Promise<void> {
    this.server.close()
    await this.dbConnection.close()
  }
}
