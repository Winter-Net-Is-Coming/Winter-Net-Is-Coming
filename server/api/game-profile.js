const router = require('express').Router();
const { userGameProfile } = require('../db/models');

// GET scores
router.get('/', async (req, res, next) => {
  try {
    const scores = await userGameProfile.findAll();
    res.json(scores);
  } catch (err) {
    next(err);
  }
});

// POST scores

router.post('/', async (req, res, next) => {
  try {
    const score = await userGmaeProfile.create(req.body);
    res.json(score);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
