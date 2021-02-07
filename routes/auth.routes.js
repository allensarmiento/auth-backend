const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.route('/signup')
  .post(authCtrl.signup);

module.exports = router;
