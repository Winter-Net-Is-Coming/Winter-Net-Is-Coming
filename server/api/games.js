const router = require('express').Router();
const { Game } = require('../db/models');

// GET
router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const game = await Game.create(req.body);
    res.json(game);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
