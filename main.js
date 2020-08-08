let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title 
    this.author = author 
    this.pages = pages 
    this.isRead = isRead 
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
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
myLibrary.push(lightningThief);
myLibrary.push(it);

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
function render(){
    let library = document.getElementById("library");
    for(let i=0; i<myLibrary.length; i++){
        let book = document.createElement("div");
        let title = document.createElement("h2");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let isRead = document.createElement("div");

        title.innerHTML = myLibrary[i].title;
        author.innerHTML = myLibrary[i].author;
        pages.innerHTML = myLibrary[i].pages;
        
        isRead.classList.add("unread");
        if (myLibrary[i].isRead) {
            isRead.classList = "read";
        }

        book.dataset.indexNumber = i;
        book.classList.add("book");
        [title, author, pages, isRead].forEach(element => book.appendChild(element));

        library.appendChild(book);
        console.log("book added");
    }
}

render();