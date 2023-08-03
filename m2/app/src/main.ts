import { handler } from './app'
import { startListenQueue } from './shared/mq.helper'

startListenQueue(handler)
