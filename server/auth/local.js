const User = require('../db/models/user')

LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email',
},
  async (username, password, done) => {
      //Change this logic to actually check 
      console.log('AUTH', username, password)
      const user = await User.findOne({ where: {email: username} });
      //if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      /*
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }*/
      return done(null, user);
    },
  
);

module.exports = {
    localStrategy,
}
