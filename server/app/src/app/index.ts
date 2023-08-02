import express from 'express'
import cors from 'cors'
import asyncHandler from 'express-async-handler'
import errorHandler from './error.handler'
import notFoundHandler from './not-found.handler'
import baseRouter from './base.router'

const app = express()
const BASE_API = '/api'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(BASE_API, baseRouter)

app.all('*', asyncHandler(notFoundHandler))

app.use(errorHandler)

export default app
