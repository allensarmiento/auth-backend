const redisClient = require('../redisClient');

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorization.split(' ')[1];

  return redisClient.get(token, (error, reply) => {
    if (error || !reply) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  });
};

module.exports = { requireAuth };
