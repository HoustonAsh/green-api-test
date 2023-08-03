import amqp from 'amqplib'
import { RABBITMQ_URL, RABBITMQ_REQ_QUEUE } from './config'
import { EventEmitter } from 'events'

let mqChannel: amqp.Channel | null = null
const eventEmitter = new EventEmitter()

export async function getMqChannel() {
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

export async function startListenQueue(
  cb: (msg: amqp.ConsumeMessage | null) => void
) {
  const channel = await getMqChannel()
  if (!channel) return

  await channel.assertQueue(RABBITMQ_REQ_QUEUE)

  channel.consume(RABBITMQ_REQ_QUEUE, cb, {
    noAck: true,
  })
}
