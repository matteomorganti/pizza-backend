const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../Models/userModel");

const secretKey = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    
    const user = await User.findOne({ username: payload.username }); // Find the user by username (based on the payload data)
    if (user) {
      
      return done(null, user); // If the user is found, pass it to the next middleware
    } else {
      
      return done(null, false); // If the user is not found, return 'false' indicating authentication failure
    }
  } catch (error) {
   
    return done(error, false);  // If there is an error, return it with 'false' indicating authentication failure
  }
});

passport.use(jwtStrategy);

module.exports = passport;
