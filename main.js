const addBtn = document.getElementById("add-btn");
let library = document.getElementById("library");
let addForm = document.getElementById("add");
let bookCounter = 0;
let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title 
    this.author = author 
    this.pages = pages 
    this.isRead = isRead 
}

Book.prototype.info = function() {
    read = "not read yet"
    if (this.isRead) {
        read = "already read"
    }
    return `${this.title}, ${this.pages} pages, ${read}`
}

const lightningThief = new Book("The Lightning Thief", "Rick Riordan", 395, true);
const it = new Book("IT", "Steven King", 1025, true);
const theShining = new Book("The Shining", "Stephen King", 572, false);
myLibrary.push(lightningThief);
myLibrary.push(it);
myLibrary.push(theShining);


/**
 * The library website will allow users to add books to the library array,
 * which will be rendered in HTML. There will be a "NEW BOOK" button which
 * will bring up a form that allows users to input the data for a new book:
 * the author, title, pages, and whether it has been read. 
 * 
 * There will also be a button to remove the book from the library, and
 * a button to change its read status.
 * 
 */

/**
 * The render() function will iterate over myLibrary and
 * for each book
 * create HTML for a new card (shaped as a book) displaying the
 *     title, author, number of pages, and a read status indicator
 *     which will be a small green circle in the corner if read, and red if not
 *     the element for the card will need a "data-index-number" attribute corresponding
 *     to the array index. 
 */

function addBook(newBook){
    let book = document.createElement("div");
    let book_inner = document.createElement("div");
    let book_front = document.createElement("div");
    let book_back = document.createElement("div");

    book.classList.add("book");
    book_inner.classList.add("book-inner");
    book_front.classList.add("book-front");
    book_back.classList.add("book-back");
    book_back.classList.add("unread");

    let title = document.createElement("h2");
    let author = document.createElement("p");
    let pages = document.createElement("p");
    let isRead = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let toggleReadBtn = document.createElement("button");

    title.innerHTML = newBook.title;
    title.classList.add("title");
    author.innerHTML = newBook.author;
    author.classList.add("author");
    pages.innerHTML = `Pages: ${newBook.pages}`;
    pages.classList.add("pages");
    isRead.innerHTML = "Status: Unfinished";
    isRead.classList.add("status");
    deleteBtn.innerHTML = "Delete";
    toggleReadBtn.innerHTML = "Toggle Read";

    book.appendChild(book_inner);
    [book_front, book_back].forEach(element => book_inner.appendChild(element));
    [title, author].forEach(element => book_front.appendChild(element));
    [pages, isRead, deleteBtn, toggleReadBtn].forEach(element => book_back.appendChild(element));
    if (newBook.isRead) {
        book_back.classList.add("read");
        book_back.classList.remove("unread");
        isRead.innerHTML = "Status: Finished";
    }

    book.dataset.indexNumber = bookCounter;
    bookCounter += 1;

    library.appendChild(book);
    console.log("book added");

    deleteBtn.addEventListener('click', deleteBook);
    toggleReadBtn.addEventListener('click', toggleStatus);
}

function render(){
    for(let i=0; i<myLibrary.length; i++){
        addBook(myLibrary[i]);
    }
}

addBtn.addEventListener('click', () => {
    let newTitle = addForm['new-title'].value;
    let newAuthor = addForm['new-author'].value;
    let newPages = addForm['new-pages'].value;
    let readCheck = addForm['new-read'].checked;
    let newBook = new Book(newTitle, newAuthor, newPages, readCheck)
    if (isNaN(newPages) || Number(newPages) < 0 || !Number.isInteger(+newPages)) {
        alert("The page entry needs a positive integer!");
        return;
    }
    if (!newTitle || !newAuthor || !newPages) {
        alert("You're missing something!");
        return;
    }

    addBook(newBook);
    myLibrary.push(newBook);
    addForm['new-title'].value = '';
    addForm['new-author'].value = '';
    addForm['new-pages'].value = '';
    addForm['new-read'].checked = false;
})

function deleteBook(){
    myLibrary.splice(Number(this.parentNode.parentNode.parentNode.dataset.indexNumber), 1);
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
}

function toggleStatus(){
    let status = this.parentNode.children[1]
    if (status.innerHTML === "Status: Unfinished") {
        status.innerHTML = "Status: Finished";
    } else {
        status.innerHTML = "Status: Unfinished";
    }
    this.parentNode.classList.toggle("unread");
    this.parentNode.classList.toggle("read");
}
render();