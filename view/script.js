
function fetchAndDisplayBooks() {
    axios.get('http://localhost:3000/books')
      .then(response => {
        if (response && response.data) {
          response.data.forEach(book => {
            displayBookInfo(book.id, book.name, book.createdAt, book.returnTime);
          });
        } else {
          console.error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error.response ? error.response.data.error : error.message);
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayBooks();
  });
  
  function handleForm(event) {
    event.preventDefault();
    const bookInput = document.getElementById('book');
    const bookName = bookInput.value;
  
    axios.post('http://localhost:3000/borrow', { book: bookName })
      .then(response => {
        if (response && response.data) {
          const { id, name, createdAt, returnTime } = response.data;
          displayBookInfo(id, name, createdAt, returnTime);
          bookInput.value = "";
        } else {
          console.error('Invalid response format');
        }
      })
      .catch(error => {
        console.error('Error borrowing book:', error.response ? error.response.data.error : error.message);
      });
  }
  
  function handlePayFine(bookId, fineParagraph, returnButton) {
    console.log(`Paid fine for book ${bookId}`);
  
    fineParagraph.textContent = 'Fine: $0';
  
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }
  
  function displayBookInfo(bookId, bookName, borrowTime, returnTime) {
    const bookInfoDiv = document.createElement('div');
    bookInfoDiv.classList.add('book-info');
  
    const bookNameParagraph = document.createElement('p');
    bookNameParagraph.textContent = `Book: ${bookName}`;
    bookInfoDiv.appendChild(bookNameParagraph);
  
    const borrowTimeParagraph = document.createElement('p');
    const borrowTimeFormatted = new Date(borrowTime).toLocaleString();
    borrowTimeParagraph.textContent = `Borrowed at: ${borrowTimeFormatted}`;
    bookInfoDiv.appendChild(borrowTimeParagraph);
  
    const returnTimeParagraph = document.createElement('p');
    const returnTimeFormatted = new Date(returnTime).toLocaleString();
    returnTimeParagraph.textContent = `Return Time: ${returnTimeFormatted}`;
    bookInfoDiv.appendChild(returnTimeParagraph);
  
    const fineParagraph = document.createElement('p');
  
    const currentTime = new Date();
    const returnTimeDate = new Date(returnTime);
    const timeDifference = currentTime.getTime() - returnTimeDate.getTime();
  
    let fineAmount = 0;
    if (timeDifference > 0) {
      fineAmount = Math.floor(timeDifference / (60 * 60 * 1000)) * 10;
    }
  
    fineParagraph.textContent = `Fine: $${fineAmount}`;
    bookInfoDiv.appendChild(fineParagraph);
  
    const returnButton = document.createElement('button');
    returnButton.textContent = 'Return';
    returnButton.addEventListener('click', async () => {
      await handlePayFine(bookId, fineParagraph, returnButton);
      handleReturn(bookId, bookInfoDiv);
    });
  
    if (fineAmount > 0) {
      const payFineButton = document.createElement('button');
      payFineButton.textContent = 'Pay Fine';
      payFineButton.addEventListener('click', async () => {
        await handlePayFine(bookId, fineParagraph, returnButton);
        returnButton.disabled = false;
      });
      bookInfoDiv.appendChild(payFineButton);
  
      returnButton.disabled = true;
    }
  
    bookInfoDiv.appendChild(returnButton);
  
    document.body.appendChild(bookInfoDiv);
  }
  
  function handleReturn(bookId, bookInfoDiv) {
    axios.post('http://localhost:3000/return', { id: bookId })
      .then(() => {
        document.body.removeChild(bookInfoDiv);
      })
      .catch(error => {
        console.error('Error returning book:', error.response ? error.response.data.error : error.message);
      });
  }
  