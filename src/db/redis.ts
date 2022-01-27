const redis = require('redis')


var redisClient = redis.createClient()

redisClient.on('error', function (err: any) {
  console.log('could not establish a connection with redis. ' + err)
})
redisClient.on('connect', function (err: any) {
  console.log('connected to redis successfully')
})

async function getOrSetCache(key: string, cb: () => any) {
  let data = await redisClient.get(key)

  // if(data)

  if (data != null) return JSON.parse(data)

  const freshData = await cb()
  redisClient.setEx(key, 300, JSON.stringify(freshData))
  return freshData
};

module.exports = { redisClient, getOrSetCache }
