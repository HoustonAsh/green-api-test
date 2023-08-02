import express from 'express'
import asyncHandler from 'express-async-handler'
import getM1 from './get-m1.handler'

const routes = express.Router()

routes.get('/m1', asyncHandler(getM1))

export default routes
