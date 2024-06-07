const { body, param } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const Post = require('../models/post');

module.exports = [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('body').trim().isLength({ min: 7 }).withMessage('Body too short'),
  param('id')
    .optional({ values: 'falsy' })
    .trim()
    .custom(async (val) => {
      if (!isValidObjectId(val) || !(await Post.findById(val)))
        throw new Error('Invalid Post ID');
    }),
];
