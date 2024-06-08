const asyncHandler = require('express-async-handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userValidators = require('../validators/user');
const User = require('../models/user');
const { validationResult } = require('express-validator');
require('dotenv').config();

exports.login = [
  passport.authenticate('local', { session: false }),
  asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
    res.json({ token });
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
      res.json({ user, errors: errors.array() });
    } else {
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.json({ token });
    }
  }),
];
