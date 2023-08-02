import type { RequestHandler } from 'express'
import type { Request } from 'express-jwt'

const getM1: RequestHandler = async (req: Request, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  res.json({
    token,
    profile: {
      email: 'admin@gmail.com',
    },
  })
}

export default getM1
