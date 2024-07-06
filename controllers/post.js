const Post = require('../models/post');
const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const post_validators = require('../validators/post');
const { validationResult } = require('express-validator');
const { isAdmin, isAuthJWT } = require('./authmiddleware');
const { isValidObjectId } = require('mongoose');

exports.get_posts = [
  isAuthJWT,
  asyncHandler(async function (req, res) {
    let posts;
    if (req.user.admin) {
      posts = await Post.find({}, { __v: 0 });
    } else {
      posts = await Post.find({ public: true }, { __v: 0 });
    }
    res.json({ posts: posts.length ? posts : 'No posts' });
  }),
];

exports.get_post = [
  isAuthJWT,
  asyncHandler(async function (req, res) {
    if (!isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Invalid post ID' });
    const post = await Post.findById(req.params.id, { __v: 0 });
    res.json({ post: post ? post : "Post doesn't exist" });
  }),
];

exports.create_post = [
  isAuthJWT,
  isAdmin,
  ...post_validators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
    });
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ post: { title: post.title, body: post.body }, errors: errors.array() });
    } else {
      await post.save();
      res.json({ post });
    }
  }),
];
exports.update_post = [
  isAuthJWT,
  isAdmin,
  ...post_validators,
  asyncHandler(async function (req, res) {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.status(400).json({ post, errors: errors.array() });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
        new: true,
      });
      res.json({ updatedPost });
    }
  }),
];

exports.delete_post = [
  isAuthJWT,
  isAdmin,
  asyncHandler(async function (req, res) {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      await Comment.deleteMany({ post: post._id });
    }
    res.json({ post });
  }),
];
