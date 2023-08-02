import amqp from 'amqplib'
import { RABBITMQ_URL, RABBITMQ_QUEUE } from './config'

let mqChannel: amqp.Channel | null = null

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

export async function startListenQueue() {
  const channel = await getMqChannel()
  if (!channel) return

  await channel.assertQueue(RABBITMQ_QUEUE)

  channel.consume(RABBITMQ_QUEUE, (msg: amqp.ConsumeMessage | null) => {})
}

export async function requestMq(queue: string, payload: Uint8Array) {
  try {
    const channel = await getMqChannel()

    if (!channel) return
  } catch (e) {}
}
