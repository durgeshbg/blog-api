const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userValidators = require('../validators/user');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const { isAuthLocal } = require('./authmiddleware');
require('dotenv').config();

exports.login = [
  isAuthLocal,
  asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
    res.json({ token, admin: req.user.admin });
  }),
];

exports.register = [
  userValidators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    if (!errors.isEmpty()) {
      const { firstname, lastname, username, email, password } = user;
      res.status(400).json({
        user: { firstname, lastname, username, email, password },
        errors: errors.array(),
      });
    } else {
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.json({ token, admin: req.user.admin });
    }
  }),
];
