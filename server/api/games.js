const router = require('express').Router();
const { Game, User } = require('../db/models');

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

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const game = await Game.findByPk(req.params.id);
    await game.destory();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
