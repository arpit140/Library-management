
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('library', 'root', '7488552785aA@', {
  host: 'localhost',
  dialect: 'mysql',
});

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  returnTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

sequelize.sync();

module.exports = Book;
