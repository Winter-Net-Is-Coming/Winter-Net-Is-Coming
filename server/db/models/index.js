// define associations here
const User = require('./user');
const Game = require('./game');
const User_Game_Profile = require('./user_game_profile');


User.belongsToMany(Game, { through: User_Game_Profile });
Game.belongsToMany(User, { through: User_Game_Profile });

module.exports = {
  User,
  Game,
  User_Game_Profile
}