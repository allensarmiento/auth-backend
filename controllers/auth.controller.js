const bcrypt = require('bcrypt');
const db = require('../connectDB');

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
    res.status(400).json('unable to register user');
  });
};

module.exports = { signup };
