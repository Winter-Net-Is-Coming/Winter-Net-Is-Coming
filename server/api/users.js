const router = require('express').Router();
const { User } = require('../db/models');

// GET
router.get('/:gameId', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        gameId: req.params.gameId,
      },
    });
    res.json(users);
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
