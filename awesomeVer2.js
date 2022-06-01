// || ==== classes === ||

class ArrBooks {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  deleteBook(bookID) {
    this.books = this.books.filter((book) => book.id !== Number(bookID));
  }

  getBookById(bookID) {
    return this.books.find((book) => book.id === Number(bookID));
  }

  getNewID() {
    return this.books.reduce((a, b) => Math.max(a, b.id), 0) + 1 || 1;
  }
}

function Book(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

// || ==== Maintaining Database and Local Storage === ||

const arrBooks = new ArrBooks();

function saveLocal() {
  localStorage.setItem('arrBooksLocal', JSON.stringify(arrBooks.books));
}

const localBooks = JSON.parse(localStorage.getItem('arrBooksLocal'));

if (localBooks) {
  arrBooks.books = localBooks;
} else {
  arrBooks.books = [
    {
      id: 1,
      title: 'The Adventures Of Sherlock Holmes',
      author: 'Sir Author Conan Doyle',
    },
    {
      id: 2,
      title: 'Around The World In 80 Days',
      author: 'Jules Verne',
    },
    {
      id: 3,
      title: 'Great Expectation',
      author: 'Charles Dickens',
    },
    {
      id: 4,
      title: 'The Three Musketeers',
      author: 'Alexander Dumas',
    },
    {
      id: 5,
      title: 'Robinson Crusoe',
      author: 'Daniel Defoe',
    },
  ];
}

// || ==== Compiling Book Card For Rendering In HTML Page (uses article element)=== ||

function compileBookArticle(book) {
  const articleBook = document.createElement('article');
  articleBook.className = 'books';
  articleBook.id = `book-${book.id}`;
  articleBook.innerHTML = `<p>
  '${book.title}'
  </p>
  <p>
  By ${book.author}
  </p>
  <button type='button' class='remove' id='id-${book.id}'>Remove</button>
  `;
  return articleBook;
}

// || ====================== UTILITIES ====================== ||

function removeBooks(bookID) {
  // remove book from html booklist, arrBooks and update locals
  bookID = bookID.replace(/\D/gi, '');
  const article = document.getElementById(`book-${bookID}`);
  arrBooks.deleteBook(bookID);
  saveLocal();
  article.parentNode.removeChild(article);
}

function appendBooklist(book) {
  // appending html booklist
  const articleBooklist = document.getElementById('booklist');
  articleBooklist.className = 'booklist';
  articleBooklist.id = 'booklist';
  articleBooklist.appendChild(compileBookArticle(book));
  document.getElementById(`id-${book.id}`).addEventListener('click', () => {
    removeBooks(`id-${book.id}`);
  });
}

for (let i = 0; i < arrBooks.books.length; i += 1) {
  // Rendering Booklist On Page Load
  appendBooklist(arrBooks.books[i]);
}

document.getElementById('add-book').addEventListener('submit', (event) => {
  // Handling Form Add Button To Add Book, Append Html Booklist and Update local
  event.preventDefault();
  const newBookId = arrBooks.getNewID();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  arrBooks.addBook(new Book(newBookId, title, author));
  appendBooklist(arrBooks.getBookById(newBookId));
  saveLocal();
  event.stopPropagation();
});

const form = document.getElementById('add-book');

function handleSubmit(event) {
  event.preventDefault();
  form.reset();
}

form.addEventListener('submit', handleSubmit);
