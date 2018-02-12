import passport from 'koa-passport';
import Google from 'passport-google-oauth';

import { googleOAuth as config } from '../config.mjs';
import User from '../models/usermodel.mjs';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error('User does not exist');
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new Google.OAuth2Strategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: '/google/redirect',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          cb(null, user);
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
          });
          await newUser.save();
          cb(null, user);
        }
      } catch (err) {
        cb(err);
      }
    },
  ),
);
