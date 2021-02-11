const db = require('../connectDB');
const redisClient = require('../redisClient');

const getUser = (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.split(' ')[1];

    redisClient.get(token, (error, reply) => {
      if (error || !reply) {
        return res.status(400).send('unauthorized');
      }

      return db.from('users')
        .select('*')
        .where({ id: reply })
        .then((data) => {
          if (data) {
            data.hashed_password = undefined;
            return res.json(data[0]);
          }
          return res.status(400).json('could not get user');
        })
        .catch((error) => res.status(400).json('could not get user'));
    });
  } else {
    return res.status(400).json('unauthorized');
  }
};

module.exports = {
  getUser,
};
