const router = require('express').Router();
const { User } = require('../db/models');

// get all users (only for admin)
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userName'],
    });
    res.json(users)
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/signup', async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const newUser = await User.create({
      userName,
      password,
    });
    res.json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
