import AppError from '@/shared/app.error'
import { UnauthorizedError } from 'express-jwt'
import { ZodError } from 'zod'
import { ServerResponse } from '@/shared/config'
import type { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(JSON.stringify(error, null, 2))
  let message = ServerResponse.UNKNOWN.message
  let code = ServerResponse.UNKNOWN.code

  if (error instanceof AppError) {
    message = error.message
    code = error.code
  } else if (error instanceof UnauthorizedError) {
    message = ServerResponse.UNAUTHORIZED.message
    code = ServerResponse.UNAUTHORIZED.code
  } else if (error instanceof ZodError) {
    message = ServerResponse.BAD_DATA.message
    code = ServerResponse.BAD_DATA.code

    error.issues
      .filter((issue) => issue.message.startsWith('#'))
      .forEach((issue) => {
        message = message.concat('\n', issue.message.substring(1))
      })
  }

  res.status(400).json({
    message,
    code,
  })
}

export default errorHandler
