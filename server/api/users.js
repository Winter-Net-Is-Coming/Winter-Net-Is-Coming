const router = require('express').Router();
const {User} = require('../db/models');
//const {ensureAdmin, ensureLogin} = require('./middleware')

//all these routes are accessible only for admin users
// get all users (only for admin) (/api/users)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
    attributes: ['id', 'email', 'userName']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

//get user by id(/api/users/id)
router.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
  
      if (isNaN(Number(id))) {
        res.sendStatus(400)
        return
      }
  
      const singleUser = await User.findByPk(id)
  
      if (!singleUser) {
        res.sendStatus(404)
        return
      }
  
      res.json(singleUser)
    } catch (error) {
      next(error)
    }
  });



  



module.exports = router