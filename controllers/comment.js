const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.get_comments = asyncHandler(async function (req, res, next) {
  const comments = await Comment.find({ post: req.params.id }, { __v: 0 }).exec();
  res.json({ comments });
});

exports.get_comment = asyncHandler(async function (req, res, next) {
  const comment = await Comment.findById(req.params.cid, { __v: 0 }).exec();
  res.json({ comment });
});

