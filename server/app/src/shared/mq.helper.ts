import amqp from 'amqplib'
import { RABBITMQ_URL } from './config'

let mqServer: amqp.Connection | null = null

async function getMqServer() {
  if (mqServer) return mqServer

  try {
    mqServer = await amqp.connect(RABBITMQ_URL)

    return mqServer
  } catch (error) {
    console.log(error)
    return false
  }
}

async function startListenQueue() {
  const mqServer = await getMqServer()

  mqServer
}
