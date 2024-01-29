const Book = require('../model/bookModel');

async function borrowBook(bookName) {
  try {
    const borrowedTime = new Date();
    const returnTime = new Date(borrowedTime.getTime() -2 * 60 * 60 * 1000);

    const newBook = await Book.create({ name: bookName, createdAt: borrowedTime, returnTime });

    return { ...newBook.toJSON(), returnTime: returnTime.toISOString() };
  } catch (error) {
    console.error('Error handling borrow request:', error);
    throw new Error('Internal Server Error');
  }
}

async function returnBook(bookId) {
  try {
    const returnedBook = await Book.findByPk(bookId);

    if (!returnedBook) {
      throw new Error('Book not found');
    }

    await returnedBook.destroy();

    return 'Book returned successfully';
  } catch (error) {
    console.error('Error handling return request:', error);
    throw new Error('Internal Server Error');
  }
}

async function getAllBooks() {
  try {
    const allBooks = await Book.findAll();
    return allBooks.map(book => ({
      id: book.id,
      name: book.name,
      createdAt: book.createdAt,
      returnTime: book.returnTime,
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = { borrowBook, returnBook, getAllBooks };
