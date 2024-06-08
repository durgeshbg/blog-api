const { body } = require('express-validator');
const User = require('../models/user');

module.exports = [
  body('firstname').trim().isLength({ min: 1 }).withMessage('Firstname cannot be empty'),
  body('lastname').trim().isLength({ min: 1 }).withMessage('Lastname cannot be empty'),
  body('username')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Username is required')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) throw new Error('Username already in use');
    }),
  body('email').trim().isLength({ min: 1 }).withMessage('Email is required'),
  body('password').trim().isLength({ min: 1 }).withMessage('Password is required'),
  body('cpassword')
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password Confirmation doesn't match"),
];
