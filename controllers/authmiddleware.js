const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) next();
  else res.status(401).json({ error: 'Not an admin' });
};

exports.isAuthor = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.cid);
  if (req.user._id.toString() === comment.username.toString()) next();
  else res.status(401).json({ error: 'You are not authorised' });
});

exports.isAuthorOrAdmin = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.cid);
  if (req.user.admin || req.user._id.toString() === comment.username.toString()) next();
  else res.status(401).json({ error: 'You are not authorised' });
});
