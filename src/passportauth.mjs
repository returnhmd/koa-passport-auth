import passport from 'koa-passport';
import Google from 'passport-google-oauth';
import Twitter from 'passport-twitter';
import Facebook from 'passport-facebook';
import createError from 'http-errors';

import { keys } from '../config';
import User from './usermodel';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      done(createError(418));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/* eslint no-underscore-dangle: 0 */

passport.use(
  new Facebook.Strategy(
    {
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: '/auth/facebook/redirect',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ authId: profile._json.id });
        if (user) {
          cb(null, user);
        } else {
          const newUser = new User({
            origin: 'facebook',
            authId: profile._json.id,
            username: profile._json.displayName,
            photoUrl: profile._json.image.url,
          });
          await newUser.save();
          cb(null, newUser);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.use(
  new Google.OAuth2Strategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ authId: profile._json.id });
        if (user) {
          cb(null, user);
        } else {
          const newUser = new User({
            origin: 'google',
            authId: profile._json.id,
            username: profile._json.displayName,
            photoUrl: profile._json.image.url,
          });
          await newUser.save();
          cb(null, newUser);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);

passport.use(
  new Twitter.Strategy(
    {
      consumerKey: keys.twitter.consumerKey,
      consumerSecret: keys.twitter.consumerSecret,
      callbackURL: '/auth/twitter/redirect',
    },
    async (token, tokenSecret, profile, cb) => {
      try {
        const user = await User.findOne({ authId: profile._json.id_str });
        if (user) {
          cb(null, user);
        } else {
          const newUser = new User({
            origin: 'twitter',
            authId: profile._json.id_str,
            username: profile._json.name,
            photoUrl: profile._json.profile_image_url,
          });
          await newUser.save();
          cb(null, newUser);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);
