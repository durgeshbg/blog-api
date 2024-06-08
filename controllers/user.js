const asyncHandler = require('express-async-handler');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = [
  passport.authenticate('local', { session: false }),
  asyncHandler(async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
    res.json({ token });
  }),
];
