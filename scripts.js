const myLibrary = [];

class Book {
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    static toggleReadStatus(){
        this.classList.toggle("read");
        let index = this.parentNode.dataset.bookIndex;
        (myLibrary[index].read == 'READ') ? myLibrary[index].read = 'NOT READ' :
            myLibrary[index].read = 'READ';
        this.innerText = myLibrary[index].read;
    }

    static removeBook(){
        let index = this.closest('tr').dataset.bookIndex
        myLibrary.splice(index, 1)
        updateLibraryTable();
    }

    static addBookToLibrary(title, author, pages, read){
        let newBook = new Book(title, author, pages, read)
        myLibrary.push(newBook)
        updateLibraryTable();
    }
}

function updateLibraryTable(){
    tableBody.replaceChildren();
    myLibrary.forEach(function(book, index) {
        let newRow = document.createElement('tr');
        newRow.dataset.bookIndex = index;
        for (const property in book) {
            if ( property == 'read') {
                let newCell = document.createElement('button');
                newCell.innerText = book[property];
                newCell.dataset.readButton = '';
                newCell.classList.add('read-button');
                (book[property] === 'READ') ? newCell.classList.add('read') : 0; 
                newCell.addEventListener('click', Book.toggleReadStatus);
                newRow.appendChild(newCell)
            } else {
                let newCell = document.createElement('td');
                newCell.innerText = book[property];
                newRow.appendChild(newCell)
            } 
        }
        let newCell = document.createElement('td');
        let buttonRemove = document.createElement('i');
        buttonRemove.classList.add('fa-solid', 'fa-trash');
        buttonRemove.dataset.removeButton = '';
        buttonRemove.addEventListener('click', Book.removeBook);
        newCell.appendChild(buttonRemove);
        newRow.appendChild(newCell);


        tableBody.appendChild(newRow);       
    })    
}

function addFormEventListener(){
    let btnAddBook = document.querySelector('[data-add-book]');
    btnAddBook.addEventListener('click', (e) => {
        e.preventDefault();
        let title = document.querySelector('input#title').value;
        let author = document.querySelector('input#author').value;
        let pages = document.querySelector('input#pages').value;
        let read = (document.querySelector('input[name=readStatus]:checked').value).toUpperCase();
        Book.addBookToLibrary(title, author, pages, read);
        document.querySelector('form').reset();
        newBookDialog.close();
    })
}

function showNewBookForm(){
    newBookButton.addEventListener('click', () => {
        newBookDialog.showModal();
    });
}


const newBookButton = document.querySelector('[data-btn-new-book]');
const newBookDialog = document.querySelector('[data-dialog-new-book');
const tableBody = document.querySelector('tbody');
Book.addBookToLibrary('JS Generated Book', 'Author', 1337, 'NOT READ');
Book.addBookToLibrary('JS Generated Book 2', 'Author', 192, 'READ');
addFormEventListener();
showNewBookForm();