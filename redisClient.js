const redis = require('redis');
const { RedisURI } = require('./config');

const redisClient = redis.createClient(RedisURI);

module.exports = redisClient;
