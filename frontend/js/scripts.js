let books = [
    { title: "The Great Novel", author: "John Doe", category: "Novel" },
    { title: "Science in Action", author: "Jane Smith", category: "Science" },
    { title: "World History", author: "Alan Walker", category: "Historical" },
    // Add more books as necessary
];

function displayBooks(filteredBooks) {
    const booksTable = document.querySelector('#booksTable tbody');
    booksTable.innerHTML = ''; // Clear previous entries
    filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td><button onclick="borrowBook('${book.title}')">Borrow</button></td>
        `;
        booksTable.appendChild(row);
    });
}

function searchBooks() {
    const searchTerm = document.getElementById('searchBook').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
}

function filterBooks(category) {
    const filteredBooks = books.filter(book => book.category === category);
    displayBooks(filteredBooks);
}

function borrowBook(bookTitle) {
    alert(`You have borrowed: ${bookTitle}`);
}

// Initial display of all books
displayBooks(books);

// Function to handle image upload
function uploadImage(event) {
    const reader = new FileReader();
    reader.onload = function(){
        const profileImage = document.getElementById('profileImage');
        profileImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function editProfile() {
    // Implement functionality to allow user to edit their full name, username, email, and password
    alert("Edit profile functionality coming soon!");
}

function logout() {
    // Redirect to the login page or perform logout operation
    window.location.href = 'User_Login.html';
}
