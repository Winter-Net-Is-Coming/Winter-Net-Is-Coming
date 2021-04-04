const router = require('express').Router()
const User = require('../db/models/user')
const passport = require('passport');
module.exports = router;

router.get('/authenticate', async (req, res, next) => {
  console.log(req.user)
  res.json(req.user)
})


router.post('/login', async (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    console.log("STEVE WHATS HAPPENING", err, user, info)
    if (err) {
      req.logout();      
      return res.status(403).json(err);    
    }    
    if (!user) {      
      req.logout();     
      return res.status(401).send('No such user found');    
    }    
    req.logIn(user, function (err) {
      console.log("LOGIN", err)      
      if (err) {        
        return next(err);      
      }      
      console.log("LOGIN SUCCESS")
      res.json(user);    
    });  
  })(req, res, next)},
);
/*
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})
*/

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))





/**
 * exports.logoutHandler = async (req, res, next) => {  req.logout();  res.redirect('/');};
 */
