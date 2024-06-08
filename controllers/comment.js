const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const comment_validators = require('../validators/comment');
const { validationResult } = require('express-validator');
const { isAuthor, isAuthorOrAdmin, isAuthJWT } = require('./authmiddleware');
const { isValidObjectId } = require('mongoose');

exports.get_comments = [
  isAuthJWT,
  asyncHandler(async function (req, res) {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Invalid post ID' });
    const comments = await Comment.find({ post: req.params.id }, { __v: 0 }).exec();
    res.json({ comments: comments.length ? comments : 'No comments' });
  }),
];

exports.get_comment = [
  isAuthJWT,
  asyncHandler(async function (req, res) {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Invalid Post ID' });
    if (!isValidObjectId(req.params.cid))
      return res.status(400).json({ error: 'Invalid comment ID' });
    const comment = await Comment.findById(req.params.cid, { __v: 0 }).exec();
    res.json({ comment: comment ? comment : "Comment doesn't exist" });
  }),
];

exports.create_comment = [
  isAuthJWT,
  ...comment_validators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const comment = new Comment({
      text: req.body.text,
      username: req.user._id,
      post: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.status(400).json({ comment, errors: errors.array() });
    } else {
      await comment.save();
      res.json({ comment });
    }
  }),
];

exports.update_comment = [
  isAuthJWT,
  isAuthor,
  ...comment_validators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const comment = new Comment({
      text: req.body.text,
      username: req.user._id,
      post: req.params.id,
      _id: req.params.cid,
    });
    if (!errors.isEmpty()) {
      res.status(400).json({ comment, errors: errors.array() });
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.cid, comment, {
        new: true,
      });
      res.json({ updatedComment });
    }
  }),
];

exports.delete_comment = [
  isAuthJWT,
  isAuthorOrAdmin,
  asyncHandler(async function (req, res) {
    const comment = await Comment.findByIdAndDelete(req.params.cid);
    res.json({ comment });
  }),
];
