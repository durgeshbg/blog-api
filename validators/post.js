const { body } = require('express-validator');

module.exports = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('body').trim().isLength({ min: 7 }).withMessage('Body too short'),
];
