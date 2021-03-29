const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  gameName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Game;
