import AppError from '@/shared/app.error'
import { ServerResponse } from '@/shared/config'
import type { RequestHandler } from 'express'

const notFoundHandler: RequestHandler = () => {
  throw new AppError(ServerResponse.NOT_FOUND)
}

export default notFoundHandler
