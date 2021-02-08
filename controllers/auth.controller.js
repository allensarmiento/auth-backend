const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../connectDB');
const redisClient = require('../redisClient');

const signup = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json('name, email and password are required');
  }

  const hash = bcrypt.hashSync(password, 10);

  db.transaction((trx) => {
    trx('login')
      .returning('email')
      .insert({ hashed_password: hash, email })
      .then((userEmail) => {
        return trx('users')
          .returning('*')
          .insert({ name, email: userEmail[0], created: new Date() })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((error) => {
    console.log(error);
    res.status(400).json('could not register user');
  });
};

const attemptSigninUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('email and password are required');
  }

  return db.from('login')
    .select('email', 'hashed_password')
    .where({ email })
    .then((data) => {
      const passwordMatches = bcrypt.compareSync(
        password,
        data[0].hashed_password,
      );

      if (passwordMatches) {
        return db.from('users')
          .select('*')
          .where({ email })
          .then((user) => user[0])
          .catch((error) => res.status(400).json('could not get user'));
      } else {
        return res.status(400).json('invalid email or password');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { id, email } = user;
  const token = generateToken(email);
  return setToken(token, id)
    .then(() => {
      return {
        success: 'true',
        userId: id,
        user,
        token,
      };
    })
    .catch((error) => console.log(error));
};

const getAuthorizedTokenId = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  return redisClient.get(token, (error, reply) => {
    if (error || !reply) {
      return res.status(401).send('Unauthorized');
    }
    console.log('From redis', reply);
    return res.json({ id: reply });
  });
};

const signin =  (req, res) => {
  const { authorization } = req.headers;

  if (authorization) {
    return getAuthorizedTokenId(req, res);
  } else {
    return attemptSigninUser(req, res)
      .then((userData) => {
        if (userData.id && userData.email) {
          return createSession(userData);
        } else {
          return Promise.reject(userData);
        }
      })
      .then((session) => res.json(session))
      .catch((error) => res.status(400).json(error));
  }
};

module.exports = { signup, signin };
