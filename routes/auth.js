const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth')

//http://localhost:5000/api/auth/login  for test
router.post('/login', controller.login);
//http://localhost:5000/api/auth/register  for test
router.post('/register', controller.register)

module.exports = router;
