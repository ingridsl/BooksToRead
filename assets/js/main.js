const inputBook = document.querySelector('.input-book');
const inputBookAuthor = document.querySelector('.input-book-author');

const btnBook = document.querySelector('.btn-book');
const books = document.querySelector('.books');

function createLi() {
  const li = document.createElement('li');
  return li;
}

inputBook.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputBook.value || !inputBookAuthor.value ) {
      alert("Fill all the fields, please");
      return;
    }
    createBook(inputBook.value, inputBookAuthor.value);
  }
});


inputBookAuthor.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputBook.value || !inputBookAuthor.value ) {
      alert("Fill all the fields, please");
      return;
    }
    createBook(inputBook.value, inputBookAuthor.value);
  }
});

function cleanInput() {
  inputBook.value = '';
  inputBookAuthor.value = '';
  inputBook.focus();
}

function createButtonDelete(li) {
  li.innerText += ' ';
  const buttonDelete = document.createElement('button');
  buttonDelete.innerText = 'Delete';
  // buttonDelete.classList.add('delete');
  buttonDelete.setAttribute('class', 'delete');
  buttonDelete.setAttribute('title', 'Delete esta book');
  li.appendChild(buttonDelete);
}

function createBook(titleInput, authorInput) {
  const li = createLi();
  li.innerText = titleInput + " by " + authorInput;
  books.appendChild(li);
  cleanInput();
  createButtonDelete(li);
  saveBooks();
}

btnBook.addEventListener('click', function() {
  
  if (!inputBook.value || !inputBookAuthor.value ) {
    return;
  }
  createBook(inputBook.value, inputBookAuthor.value);
});

document.addEventListener('click', function(e) {
  const el = e.target;

  if (el.classList.contains('delete')) {
    el.parentElement.remove();
    saveBooks();
  }
});

function saveBooks() {
  const liBooks = books.querySelectorAll('li');
  const bookList = [];

  for (let book of liBooks) {
    let bookTitleAndAuthor = book.innerText;
    bookTitleAndAuthor= bookTitleAndAuthor.replace('Delete', '').trim();
    bookList.push(bookTitleAndAuthor);  
  }

  const booksJSON = JSON.stringify(bookList);
  localStorage.setItem('books', booksJSON);
}

function addSavedBooks() {
  const books = localStorage.getItem('books');
  const bookList = JSON.parse(books);
  

  for(let book of bookList) {
    var res = book.split(" by " );

    createBook(res[0], res[1]);
  }
}
addSavedBooks();
