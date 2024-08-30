import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model.js'

// middlware 
dotenv.config();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  
  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://github-analytical-portal.onrender.com/api/auth/github/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
          //  console.log(profile);//gives all login information in json format
        // signup logic 
        const user=await User.findOne({username:profile.username});// serching user by username from profile info
        if(!user){
            const newUser=new User({
                name:profile.displayName,
                username:profile.username,
                profileURL:profile.profileUrl,
                avatarURL:profile.photos[0].value,
                likedProfiles:[],
                likedBy:[],
            })
            await newUser.save();//save info in database
            done(null,newUser);
        }
        else{
            //signin
            done(null,user);
        }
        
    }
  ));