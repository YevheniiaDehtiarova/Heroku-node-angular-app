const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require ('../config/keys');
const errorHandler = require('../utils/errorHandler')


module.exports.login = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email
  })
  if (candidate) {
    // check password if user is exist
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      // token generation, password matches
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60*60})
      res.status(200).json({
        token: token
      })
    } else {
      res.status(401).json({
        message: 'passwords have not been matched, try again'
      })
    }
  } else { //user doesn't exist, error
    res.status(404).json({
      message: 'user has not been founded'
    })
  }
}


module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) { // если пользователь есть то отдаем ошибку
    res.status(409).json({
      message: 'this.email has already exist'
    })
  } else { //создаем пользователя
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save();
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res,e)
    }
  }
}
