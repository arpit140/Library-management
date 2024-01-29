
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const BookController = require('./controller/bookController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/borrow', async (req, res) => {
  try {
    const { book } = req.body;
    const result = await BookController.borrowBook(book);
    res.json(result);
  } catch (error) {
    console.error('Error handling borrow request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/return', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await BookController.returnBook(id);
    res.json({ message: result });
  } catch (error) {
    console.error('Error handling return request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/books', async (req, res) => {
  try {
    const result = await BookController.getAllBooks();
    res.json(result);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    console.log('Error running server', err);
  }
  console.log('Server is running on port:', port);
});
