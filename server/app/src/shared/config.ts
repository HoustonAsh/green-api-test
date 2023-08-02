export const RABBITMQ_URL = 'amqp://guest:guest@rabbitmq:5672/'
export const MONGO_URL = 'mongodb://mongodb:27017'
export const MONGO_DB = 'green-api-test'
export const JWT_SECRET_KEY = 'JWT_SECRET_KEY'
export const ServerResponse = {
  UNKNOWN: { code: 'UNKNOWN', message: 'Unknown' },
  UNAUTHORIZED: { code: 'UNAUTHORIZED', message: 'Unauthorized' },
  BAD_DATA: { code: 'BAD_DATA', message: 'Bad data' },
  NOT_FOUND: { code: 'NOT_FOUND', message: 'Not found' },
}
