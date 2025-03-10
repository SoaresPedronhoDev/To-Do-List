// google auth
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: "509669443220-j1e4k1i3hmc7ac40re4p3pluhrd427n3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'http://localhost:5001/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails?.[0].value, 
            displayName: profile.displayName,
          });

          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;