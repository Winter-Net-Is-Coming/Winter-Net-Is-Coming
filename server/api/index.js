const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/score', require('./game-profile'));
//router.use('/games', require('./games'));


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
