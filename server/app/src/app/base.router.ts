import express from 'express'
import { m1Routes } from '@/features/m1'

const routes = express.Router()

routes.use(m1Routes)

export default routes
