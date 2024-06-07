const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const comment_validators = require('../validators/comment');
const { validationResult } = require('express-validator');

exports.get_comments = asyncHandler(async function (req, res, next) {
  const comments = await Comment.find({ post: req.params.id }, { __v: 0 }).exec();
  res.json({ comments });
});

exports.get_comment = asyncHandler(async function (req, res, next) {
  const comment = await Comment.findById(req.params.cid, { __v: 0 }).exec();
  res.json({ comment });
});

exports.create_comment = [
  ...comment_validators,
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    const comment = new Comment({
      text: req.body.text,
      username: req.body.username,
      post: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.json({ comment, errors: errors.array() });
    } else {
      await comment.save();
      res.json({ comment });
    }
  }),
];
