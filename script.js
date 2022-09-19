const title = document.querySelector("#title");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn");
const list = document.querySelector("#list");
const storage = window.localStorage;

let inputData = {};

let objectContainer = [];



const createBookElement = (book) => {
    console.log(book);
    const bookContainer = document.createElement('div');
    bookContainer.className = 'books';
    bookContainer.innerHTML = `<h2 id="title-name">${book.title}</h2><h3 id="author-name">${book.author}</h3> <button class="remove-btn">Remove</button>`;
    list.appendChild(bookContainer);
}




function storageAvailable(type) {
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


btn.addEventListener("click", (event) => {
    event.preventDefault();
    inputData.title = title.value;
    inputData.author = author.value;
    objectContainer.push(inputData);
    storage.setItem("booksData", JSON.stringify(objectContainer));
});

function retrieveData() {
    if (storageAvailable('localStorage')) {
        const bookDataInput = storage.getItem('booksData');
        const booksData = JSON.parse(bookDataInput);
        return booksData;
    }
    return null;
}

function populateFormData() {
    const bookData = retrieveData();
    if (bookData) {
        objectContainer.forEach(createBookElement);
    }
}

populateFormData();