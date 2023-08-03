import amqp from 'amqplib'
import { getMqChannel } from '@/shared/mq.helper'

export const handler = async function (msg: amqp.ConsumeMessage | null) {
  console.log(`[HANDLER] msg content = ${msg?.content}`)

  const channel = await getMqChannel()

  if (!channel || !msg) {
    return
  }

  const data = JSON.parse(String(msg.content ?? ''))
  const c = data.a + data.b

  await channel.assertQueue(msg.properties.replyTo)

  const res = channel.sendToQueue(
    msg.properties.replyTo,
    Buffer.from(JSON.stringify({ c })),
    {
      correlationId: msg.properties.correlationId,
    }
  )
}
