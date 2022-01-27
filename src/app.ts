import express from 'express'
import Express, { Application } from 'express'
import Routes from './routes'

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app: Application = Express()
// const { redisClient } = require('./db/redis')

export default async function (): Promise<Application> {
  app.use(cookieParser())
  //app.use(morgan('combined'))
  app.use(express.json())
  // redisClient.connect()

  Routes(app)
  return app
}
