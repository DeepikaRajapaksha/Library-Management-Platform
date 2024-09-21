document.getElementById('searchButton').addEventListener('click', async function () {
    const query = document.getElementById('searchInput').value;

    try {
        // Send the search request to the backend
        const response = await fetch(`/search?q=${query}`);
        const result = await response.json();

        const searchResultsDiv = document.getElementById('searchResults');
        searchResultsDiv.innerHTML = '';  // Clear previous search results

        if (result.success) {
            // Display found books
            result.books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'book-result';
                bookElement.innerHTML = `
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Category:</strong> ${book.category}</p>
                    <p><strong>Borrowed:</strong> ${book.borrowedStatus ? 'Yes' : 'No'}</p>
                `;
                searchResultsDiv.appendChild(bookElement);
            });
        } else {
            // Display error message
            searchResultsDiv.innerHTML = `<p>${result.message}</p>`;
        }
    } catch (error) {
        console.error('Search error:', error);
        alert('An error occurred during search.');
    }
});
