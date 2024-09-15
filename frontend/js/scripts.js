// Array to store member and book information
const members = [];
const books = [];

// Function to register a new member
function registerMember() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const membershipType = document.getElementById('membershipType').value;

    if (name && contact) {
        members.push({ name, contact, membershipType });
        alert('Member registered successfully!');
        document.getElementById('registrationForm').reset();
        displayMembers();
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to display all members in the manage members table
function displayMembers() {
    const membersTable = document.getElementById('membersTable').getElementsByTagName('tbody')[0];
    membersTable.innerHTML = ''; // Clear table

    members.forEach((member, index) => {
        const row = membersTable.insertRow();
        row.insertCell(0).innerText = member.name;
        row.insertCell(1).innerText = member.contact;
        row.insertCell(2).innerText = member.membershipType;

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="deleteMember(${index})">Delete</button>`;
    });
}

// Function to delete a member by index
function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
        members.splice(index, 1);
        displayMembers();
    }
}

// Function to register a new book
function registerBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (title && author && isbn) {
        books.push({ title, author, isbn });
        alert('Book registered successfully!');
        document.getElementById('bookForm').reset();
        displayBooks();
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to display all books in the manage books table
function displayBooks() {
    const booksTable = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
    booksTable.innerHTML = ''; // Clear table

    books.forEach((book, index) => {
        const row = booksTable.insertRow();
        row.insertCell(0).innerText = book.title;
        row.insertCell(1).innerText = book.author;
        row.insertCell(2).innerText = book.isbn;

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="deleteBook(${index})">Delete</button>`;
    });
}

// Function to delete a book by index
function deleteBook(index) {
    if (confirm('Are you sure you want to delete this book?')) {
        books.splice(index, 1);
        displayBooks();
    }
}

// Event listener for member registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    registerMember();
});

// Event listener for book registration form submission
document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    registerBook();
});

// Example of other possible functions for additional functionalities
// For example, search functionality for books or members, sorting, etc.
// You can add your additional functions here...

