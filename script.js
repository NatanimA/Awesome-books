const btn = document.querySelector('#btn');
const list = document.querySelector('#list');
const form = document.querySelector('form');

/* eslint-disable max-classes-per-file */
class BookObject {
  constructor(title, author) {
    this.title = title.value;
    this.author = author.value;
  }
}

class ClassLocalStorage {
  static storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      const { code, name } = e;
      return (
        e instanceof DOMException
                && (code === 22
                    || code === 1014
                    || name === 'QuotaExceededError'
                    || name === 'NS_ERROR_DOM_QUOTA_REACHED')
                && storage.length !== 0
      );
    }
  }

  static getBooks() {
    let book;
    if (this.storageAvailable('localStorage')) {
      if (localStorage.getItem('booksData') == null) {
        book = [];
      } else {
        book = JSON.parse(localStorage.getItem('booksData'));
      }
    }
    return book;
  }

  static addBooks(book) {
    const booksList = this.getBooks();
    booksList.push(book);
    localStorage.setItem('booksData', JSON.stringify(booksList));
  }
}

const createBookElement = () => {
  const bookData = ClassLocalStorage.getBooks();
  bookData.forEach((book) => {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'books';
    bookContainer.innerHTML = `<h2 id="title-name">${book.title}</h2><p id="author-name">${book.author}</p> <button class="remove-btn">Remove</button>`;
    list.appendChild(bookContainer);
  });
};

createBookElement();
btn.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');

  const bookCard = new BookObject(title, author);

  ClassLocalStorage.addBooks(bookCard);

  const bookContainer = document.createElement('div');
  bookContainer.className = 'books';
  bookContainer.innerHTML = `<h2 id="title-name">${bookCard.title}</h2><p id="author-name">${bookCard.author}</p> <button class="remove-btn">Remove</button>`;
  list.appendChild(bookContainer);

  form.reset();
});

const removeBtn = document.querySelector('#list');

removeBtn.addEventListener('click', (event) => {
  
  event.target.parentElement.className= "delete";
  var className = event.target.parentElement;
  event.target.parentElement.remove();
  console.log(className);
  const books = ClassLocalStorage.getBooks();

  const filtered = books.filter((book) => book.className !== className);
  localStorage.setItem('booksData', JSON.stringify(filtered));
});
