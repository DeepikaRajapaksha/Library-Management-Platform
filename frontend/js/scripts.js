// Array to store member and book information
const members = [];
const books = [];

/* Function to register a new member */
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

/* Function to display all members in the manage members table */
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

/* Function to delete a member */
function deleteMember(index) {
    members.splice(index, 1);
    alert('Member deleted successfully!');
    displayMembers();
}

/* Function to add a new book */
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    if (title && author && genre) {
        books.push({ title, author, genre });
        alert('Book added successfully!');
        document.getElementById('addBookForm').reset();
        displayBooks();
    } else {
        alert('Please fill in all fields!');
    }
}

/* Function to display all books in the manage books table */
function displayBooks() {
    const booksTable = document.getElementById('booksTable').getElementsByTagName('tbody')[0];
    booksTable.innerHTML = ''; // Clear table

    books.forEach((book, index) => {
        const row = booksTable.insertRow();
        row.insertCell(0).innerText = book.title;
        row.insertCell(1).innerText = book.author;
        row.insertCell(2).innerText = book.genre;

        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="deleteBook(${index})">Delete</button>`;
    });
}

/* Function to delete a book */
function deleteBook(index) {
    books.splice(index, 1);
    alert('Book deleted successfully!');
    displayBooks();
}

/* Function to generate reports */
function generateReports() {
    const reportContent = document.getElementById('reportContent');
    let reportHTML = '<h3>Library Reports</h3>';

    // Generate member report
    reportHTML += '<h4>Members Report</h4>';
    reportHTML += '<ul>';
    members.forEach(member => {
        reportHTML += `<li>${member.name} - ${member.contact} (${member.membershipType})</li>`;
    });
    reportHTML += '</ul>';

    // Generate book report
    reportHTML += '<h4>Books Report</h4>';
    reportHTML += '<ul>';
    books.forEach(book => {
        reportHTML += `<li>${book.title} by ${book.author} (Genre: ${book.genre})</li>`;
    });
    reportHTML += '</ul>';

    reportContent.innerHTML = reportHTML;
}
