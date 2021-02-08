const express = require('express');
const homeCtrl = require('../controllers/home.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.requireAuth)

router.route('/')
  .get(homeCtrl.getMessage);

module.exports = router;
