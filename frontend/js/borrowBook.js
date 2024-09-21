document.getElementById('borrowBookForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const bookTitle = document.getElementById('bookTitle').value;
    const borrowDate = document.getElementById('borrowDate').value;

    try {
        const response = await fetch('/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookTitle, borrowDate })
        });

        const result = await response.json();

        if (result.success) {
            alert('Book borrowed successfully!');
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error borrowing book:', error);
        alert('An error occurred while borrowing the book.');
    }
});
