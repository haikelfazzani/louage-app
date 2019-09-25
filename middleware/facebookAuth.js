var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (passport) {
  passport.use(new FacebookStrategy({
    clientID: '219570702319282',
    clientSecret: '0805fd9e002a8c168825ef0a39109749',
    callbackURL: "/login/facebook/cb",
    profileFields: ['emails','picture','birthday']
  },
    function (accessToken, refreshToken, profile, done) {
      //console.log(profile);
//http://graph.facebook.com/393773378036375/picture
          //console.log(resDat.data);
          return done(null, profile);

    }
  ));

  // Passport session setup.
  passport.serializeUser(function (user, done) {
    console.log(user);
    
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
}