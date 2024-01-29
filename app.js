const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const sequelize = new Sequelize('library_db', 'root', '7488552785aA@', {
  host: 'localhost',
  dialect: 'mysql'
});


const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taken_time: {
    type: DataTypes.DATE
  },
  returned_time: {
    type: DataTypes.DATE
  },
  fine: {
    type: DataTypes.INTEGER
  }
})
sequelize.sync();


app.use(express.static('public'));


app.get('/', (req, res) => {
 
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/borrow', async (req, res) => {
    try {
      const { bookName } = req.body;
  
      // Create a new book record
      const book = await Book.create({ name: bookName, taken_time: new Date() });
  
      res.json({ book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.post('/return', async (req, res) => {
    try {
      const { bookId } = req.body;
  
      
      const book = await Book.findByPk(bookId);
  
     
      const takenTime = new Date(book.taken_time);
      const returnedTime = new Date();
      const diffInHours = (returnedTime - takenTime) / (1000 * 60 * 60);
  
      if (diffInHours > 1) {
        book.fine = 10;
      }
  
     
      book.returned_time = returnedTime;
      await book.save();
  
      res.json({ book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
