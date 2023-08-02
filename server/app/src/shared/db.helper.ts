import { MongoClient } from 'mongodb'
import { MONGO_URL, MONGO_DB } from './config'
import type { Db } from 'mongodb'
import type { Zone } from './types'

let cachedDb: Db | null = null

async function useDb() {
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(MONGO_URL)

  const db = client.db(MONGO_DB)
  cachedDb = db

  return db
}

const useZones = async () => (await useDb()).collection<Zone>('zones')

export { useDb, useZones }
