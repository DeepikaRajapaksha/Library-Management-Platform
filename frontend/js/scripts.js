// scripts.js

// Function to switch between sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('hidden'));
    
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to handle member registration
function registerMember() {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const membershipType = document.getElementById('membershipType').value;

    // Validate input (you can add more validation as needed)
    if (!name || !contact || !membershipType) {
        alert('Please fill in all fields.');
        return;
    }

    const member = { name, contact, membershipType };

    // Send the data to the backend API (replace URL with actual endpoint)
    fetch('http://localhost:5000/api/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member)
    })
    .then(response => response.json())
    .then(data => {
        alert('Member registered successfully!');
        document.getElementById('registrationForm').reset();
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle adding books
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    if (!title || !author || !isbn) {
        alert('Please fill in all fields.');
        return;
    }

    const book = { title, author, isbn };

    // Send the data to the backend API (replace URL with actual endpoint)
    fetch('http://localhost:5000/api/books/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        alert('Book added successfully!');
        document.getElementById('bookForm').reset();
    })
    .catch(error => console.error('Error:', error));
}
