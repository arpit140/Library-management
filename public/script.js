async function borrowBook() {
    const bookName = document.getElementById('bookName').value;
  
    const response = await fetch('/borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookName }),
    });
  
    const { book } = await response.json();
  
    displayBookInfo(book);
  }
  
  async function returnBook() {
    const bookId = document.getElementById('bookId').value;
  
    const response = await fetch('/return', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookId }),
    });
  
    const { book } = await response.json();
  
    displayBookInfo(book);
  }
  
  function displayBookInfo(book) {
    const bookNameDisplay = document.getElementById('bookNameDisplay');
    const takenTimeDisplay = document.getElementById('takenTime');
  
    bookNameDisplay.textContent = `Book Name: ${book.name}`;
    takenTimeDisplay.textContent = `Taken Time: ${book.taken_time}`;
  
    if (book.returned_time) {
      // Book has been returned
      takenTimeDisplay.textContent += ` Returned Time: ${book.returned_time}`;
      takenTimeDisplay.textContent += ` Fine: ${book.fine} INR`;
    }
  
    // Display the book info container
    const bookInfoContainer = document.getElementById('bookInfo');
    bookInfoContainer.classList.remove('hidden');
  }
  