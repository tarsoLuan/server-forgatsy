const { Sequelize, DataTypes } = require('sequelize')

const db = require('../database/connection')
const User = require('./user.js')
const Book = require('./book.js')

const Review = db.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
})

Review.belongsTo(User, {
    foreignKey: 'userId',
})
Review.belongsTo(Book, {
    foreignKey: 'bookId',
})

Review.sync()

module.exports = Review