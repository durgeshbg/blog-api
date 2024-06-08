const { body, param } = require('express-validator');
const { isValidObjectId } = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = [
  body('text').trim().isLength({ min: 1 }).withMessage('Comment cannot be empty'),
  param('id')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Post ID is required')
    .custom(async (val) => {
      if (!isValidObjectId(val) || !(await Post.findById(val))) {
        throw new Error('Invalid Post ID');
      }
    }),
  param('cid')
    .optional({ values: 'falsy' })
    .trim()
    .custom(async (val) => {
      if (!isValidObjectId(val) || !(await Comment.findById(val)))
        throw new Error('Invalid Comment ID');
    }),
];
