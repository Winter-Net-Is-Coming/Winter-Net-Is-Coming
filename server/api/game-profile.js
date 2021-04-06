const router = require('express').Router();
const { User_Game_Profile, User } = require('../db/models');

// GET scores
router.get('/', async (req, res, next) => {
  try {
    const data = await User_Game_Profile.findOne({
      where: { userId: req.user.id}
    });
    res.json(data);
    console.log('score data is ===============', data)
  } catch (err) {
    next(err);
  }
});

// POST scores

router.post('/', async (req, res, next) => {
  try {
    const existingProfile = await User_Game_Profile.findOne({
      where: { userId: req.user.id}
    });

    if(!!existingProfile){
      console.log(existingProfile)
      existingProfile.score = Math.floor(req.body.score);
      res.json(await existingProfile.save());

    }else{
      const score = await User_Game_Profile.create({
        userId: req.user.id,
        gameId: 1,
        score: Math.floor(req.body.score),
      });
      res.json(score);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
