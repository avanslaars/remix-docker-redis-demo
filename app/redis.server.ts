import { createClient } from 'redis'

let _client: any = null
let _isConnected = false

function createRedisClient() {
  const client = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  })
  client.on('connect', () => {
    _isConnected = true
  })
  client.on('end', () => {
    _isConnected = false
  })
  return client
}

export async function getRedisClient() {
  if (_client !== null) {
    if (!_isConnected) {
      await _client.connect()
    }
    return _client
  }

  const client = createRedisClient()
  await client.connect()
  _client = client
  return _client
}
