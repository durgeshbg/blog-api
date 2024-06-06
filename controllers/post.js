const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

exports.get_posts = asyncHandler(async function (req, res, next) {
  const posts = await Post.find({}, { __v: 0 });
  res.json({ posts: posts });
});


