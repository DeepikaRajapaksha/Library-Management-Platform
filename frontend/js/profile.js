document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch the user profile from the server
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // This ensures cookies/session are sent
        });

        const data = await response.json();

        if (data.success) {
            // Update the profile section with fetched user data
            document.getElementById('username').textContent = data.user.username;
            document.getElementById('userEmail').textContent = data.user.email;
            document.getElementById('membershipId').textContent = data.user.membershipId;
        } else {
            console.log('Error fetching profile data:', data.message);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});
