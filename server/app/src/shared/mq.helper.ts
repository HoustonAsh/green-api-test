import amqp from 'amqplib'
import { v4 as uuidv4 } from 'uuid'
import { RABBITMQ_URL, RABBITMQ_RESP_QUEUE, RABBITMQ_REQ_QUEUE } from './config'
import { EventEmitter } from 'events'

let mqChannel: amqp.Channel | null = null
const eventEmitter = new EventEmitter()

async function getMqChannel() {
  if (mqChannel) return mqChannel

  try {
    const mqServer = await amqp.connect(RABBITMQ_URL)
    mqChannel = await mqServer.createChannel()

    return mqChannel
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function requestMq<T>(queue: string, payload: Buffer) {
  try {
    const channel = await getMqChannel()

    if (!channel) return

    const replyTo = RABBITMQ_RESP_QUEUE + String(Date.now())
    const correlationId = uuidv4()

    await channel.assertQueue(queue)

    channel.sendToQueue(queue, payload, {
      replyTo,
      correlationId,
      expiration: 100,
    })

    await channel.assertQueue(replyTo)

    const result = new Promise<T>((resolve, _) => {
      eventEmitter.once(correlationId, async data => {
        resolve(JSON.parse(data))
      })
    })

    await channel.consume(replyTo, (msg: amqp.ConsumeMessage | null) => {
      if (correlationId != msg?.properties.correlationId) return
      eventEmitter.emit(msg?.properties.correlationId, msg?.content)
      channel.ack(msg)
    })

    return result
  } catch (e) {
    console.error(e)
  }
}
