const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')


const Game = db.define('game', {

    gameName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },


      level : {
        type: Sequelize.ENUM('Beginner', 'Intermediate', 'Advanced'),
        defaultValue: 'Beginner'
      }

});

