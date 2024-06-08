const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStartegy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
require('dotenv').config();

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) return done(null, false, { message: 'Invalid username' });
      const match = await user.comparePassword(password);
      if (!match) return done(null, false, { message: 'Wrong password' });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  new JWTStartegy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async function (payload, done) {
      try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
