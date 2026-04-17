import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(new Error("No email from Google"));

        let user = await User.findOne({ parentsEmail: email });

        if (!user) {
          user = await User.create({
            parentsEmail: email,
            parentNames: profile.displayName,
            childFirstName: "Pending",
            childSurname: "Pending",
            childAge: 0,
            homeAddress: "Pending",
            stateOfOrigin: "Pending",
            childClass: "Pending",
            password: Math.random().toString(36), // placeholder password
            isVerified: true,
            avatar: profile.photos?.[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    },
  ),
);

export default passport;
