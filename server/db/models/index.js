// define associations here
const User = require('./user');
const Game = require('./game');
const User_Game_Profile = require('./user_game_profile');
const Sequelize = require('sequelize');

//const Product = require('./product.js')
////const Cart = require('./cart.js')
//const CartItem = require('./cartItem.js')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

//CartItem is a custom through table with custom columns that we added, CartItem will have both ProductId and CartId
// Product.belongsToMany(Cart, {through: CartItem})
// Cart.belongsToMany(Product, {through: CartItem})

//UserCart through table will just have UserIds and CartIds
// these two are potentially deletable
// User.belongsToMany(Cart, {through: 'UserCart'})
// Cart.belongsToMany(User, {through: 'UserCart'})

//User.hasMany(Cart)
//Game.hasMany(User);
//Cart.belongsTo(User)
//User.belongsTo(Game);

// Cart.hasMany(CartItem)
// CartItem.belongsTo(Cart)


//const User_Game_Profile = Sequelize.define('User_Game_Profile', {}, { timestamps: false });
User.belongsToMany(Game, { through: User_Game_Profile });
Game.belongsToMany(User, { through: User_Game_Profile });

module.exports = {
  User,
  Game,
  User_Game_Profile
}