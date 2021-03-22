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


//update single user details
//  /api/users/id
router.put('/:id', async(req, res,next) => {

    try{
      const id = req.params.id;
      const user = await User.findByPk(id);
      if(!user) {
        res.sendStatus(404);
        return;
      }

      const updateduser = await user.update(req.body);
      res.status(200).send(updatedStudent);
      
    } catch (error) {
        next(error);
    }
  });


 // delete a user by id
 // /api/users/id
 router.delete('/:id', async(req, res, next) => {
    try{
      const id = req.params.id;
      if(isNaN(Number(id))) {
        res.sendStatus(400); 
        return
      }
     
      const userToBeDeleted = await User.findByPk(id);
     if(userToBeDeleted === null){
        res.sendStatus(404);
        return;
      } 
       if(userToBeDeleted) {
         await User.destroy({
        where: {
          id: id
        }
      });
     res.sendStatus(204);
     return;
     } 
    } catch (error) {
      next(error);
    }
  });


  //create a new user
  // /api/users
  router.post('/', async(req, res, next) => {
    try {
    const newUser = await User.create(req.body);
    res.json(newUser)

    } catch(error) {
        next(error)
    }
    });

  




  



module.exports = router