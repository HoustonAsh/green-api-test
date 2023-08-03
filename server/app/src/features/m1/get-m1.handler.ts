import { RABBITMQ_REQ_QUEUE } from '@/shared/config'
import { requestMq } from '@/shared/mq.helper'
import type { RequestHandler, Request, Response } from 'express'
import { z } from 'zod'

type ResponseBody = { c: Number }

function validate(req: Request) {
  const schema = z.object({
    a: z.coerce.number(),
    b: z.coerce.number(),
  })

  return schema.parse(req.query)
}

const getM1: RequestHandler = async (
  req: Request,
  res: Response<ResponseBody>,
) => {
  const payload = validate(req)

  const result = await requestMq<ResponseBody>(
    RABBITMQ_REQ_QUEUE,
    Buffer.from(JSON.stringify(payload)),
  )
  return res.json(result)
}

export default getM1
