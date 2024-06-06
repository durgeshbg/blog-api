const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');

exports.get_comments = asyncHandler(async function (req, res, next) {
  const comments = await Comment.find({ post: req.params.id }, { __v: 0 }).exec();
  res.json({ comments: comments });
});
