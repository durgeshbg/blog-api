const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const post_validators = require('../validators/post');
const { validationResult } = require('express-validator');

exports.get_posts = asyncHandler(async function (req, res, next) {
  const posts = await Post.find({}, { __v: 0 });
  res.json({ posts: posts });
});

exports.get_post = asyncHandler(async function (req, res, next) {
  const post = await Post.findById(req.params.id, { __v: 0 });
  res.json({ post });
});

exports.create_post = [
  ...post_validators,
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
    });
    if (!errors.isEmpty()) {
      res.json({ post, errors: errors.array() });
    } else {
      await post.save();
      res.json({ post });
    }
  }),
];
