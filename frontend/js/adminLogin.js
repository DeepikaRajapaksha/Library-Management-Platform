document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = data.redirectTo;
        } else {
            document.getElementById('feedback').textContent = data.message;
            document.getElementById('feedback').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('feedback').textContent = 'An error occurred during login.';
        document.getElementById('feedback').style.color = 'red';
    }
});
