// Handle User Login Form Submission
document.getElementById('userLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (username && password) {
        // Submit login data to the server
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, rememberMe, type: 'user' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'user-dashboard.html'; // Redirect on success
            } else {
                document.getElementById('feedback').innerText = data.message;
            }
        });
    } else {
        document.getElementById('feedback').innerText = 'Please fill in all fields.';
    }
});

// Handle Admin Login Form Submission
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const rememberMe = document.getElementById('adminRememberMe').checked;

    if (username && password) {
        // Submit login data to the server
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, rememberMe, type: 'admin' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'admin-dashboard.html'; // Redirect on success
            } else {
                document.getElementById('admin-feedback').innerText = data.message;
            }
        });
    } else {
        document.getElementById('admin-feedback').innerText = 'Please fill in all fields.';
    }
});
