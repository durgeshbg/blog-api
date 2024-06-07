const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const comment_validators = require('../validators/comment');
const { validationResult } = require('express-validator');

exports.get_comments = asyncHandler(async function (req, res) {
  const comments = await Comment.find({ post: req.params.id }, { __v: 0 }).exec();
  res.json({ comments });
});

exports.get_comment = asyncHandler(async function (req, res) {
  const comment = await Comment.findById(req.params.cid, { __v: 0 }).exec();
  res.json({ comment });
});

exports.create_comment = [
  ...comment_validators,
  asyncHandler(async function (req, res) {
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

exports.update_comment = [
  ...comment_validators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const comment = new Comment({
      text: req.body.text,
      username: req.body.username,
      post: req.params.id,
      _id: req.params.cid,
    });
    if (!errors.isEmpty()) {
      res.json({ comment, errors: errors.array() });
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.cid, comment, {
        new: true,
      });
      res.json({ updatedComment });
    }
  }),
];
exports.delete_comment = [
  asyncHandler(async function (req, res) {
    const comment = await Comment.findByIdAndDelete(req.params.cid);
    res.json({ comment });
  }),
];
