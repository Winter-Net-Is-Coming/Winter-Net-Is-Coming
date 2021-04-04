const Sequelize = require('sequelize');
const db = require('../db');

const User_Game_Profile = db.define('userGameProfile', {
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = User_Game_Profile;
