const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(authMiddleware.requireAuth);

router.route('/:id')
  .get(userCtrl.getUser);

module.exports = router;
