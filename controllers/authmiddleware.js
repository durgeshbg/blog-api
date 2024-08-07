const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');
const passport = require('passport');

exports.isAdmin = (req, res, next) => {
  if (req.user.admin) next();
  else res.status(403).json({ error: 'Not an admin' });
};

exports.isAuthor = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.cid);
  if (!comment) res.status(400).json({ error: 'Invalid Comment ID' });
  else if (req.user.username.toString() === comment.username.toString()) next();
  else res.status(403).json({ error: 'You are not authorised' });
});

exports.isAuthorOrAdmin = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.cid);
  if (!comment) res.status(400).json({ error: 'Invalid Comment ID' });
  else if (req.user.admin || req.user.username.toString() === comment.username.toString())
    next();
  else res.status(403).json({ error: 'You are not authorised' });
});

exports.isAuthLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return res.status(401).json({ error: err });
    if (!user) return res.status(401).json({ error: info });
    req.user = user;
    return next();
  })(req, res, next);
};
exports.isAuthJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return res.status(401).json({ error: err });
    if (!user) return res.status(401).json({ error: 'Invalid token' });
    req.user = user;
    return next();
  })(req, res, next);
};
