import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "./models/userModel.js";

dotenv.config({ path: "config/config.env" });

export default function (passport) {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CLIENT_URL,
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "defaultPassword", // Provide a default password or handle it as needed
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          done(err, null);
        }
      }
    )
  );

  // Serialize the user for the session
  passport.serializeUser((user, done) => {
    try {
      if (user && user._id) {
        done(null, user._id);
      } else {
        throw new Error("Invalid user object");
      }
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  });

  // Deserialize the user
  passport.deserializeUser((id, done) => {
    const query = User.findById(id);

    if (parseInt(mongoose.version) >= 6) {
      query
        .then((user) => {
          if (!user) {
            return done(new Error("User not found"), null);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.error(err);
          return done(err, null);
        });
    } else {
      query.exec((err, user) => {
        if (err) {
          console.error(err);
          return done(err, null);
        }
        if (!user) {
          return done(new Error("User not found"), null);
        }
        return done(null, user);
      });
    }
  });
}
