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
myLibrary.push(lightningThief)

/**
 * 
 */