document.addEventListener('DOMContentLoaded', () => {
    // Fetch dashboard statistics
    fetch('/dashboard/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-users').textContent = data.totalUsers || '0';
            document.getElementById('total-books').textContent = data.totalBooks || '0';
            document.getElementById('overdue-books').textContent = data.overdueBooks || '0';
        })
        .catch(err => console.error('Error fetching stats:', err));

    // Fetch recent activity
    fetch('/dashboard/recent-activity')
        .then(response => response.json())
        .then(data => {
            const activityList = document.getElementById('recent-activity-list');
            activityList.innerHTML = ''; // Clear current list
            if (data.length > 0) {
                data.forEach(activity => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${activity.description} - ${new Date(activity.timestamp).toLocaleString()}`;
                    activityList.appendChild(listItem);
                });
            } else {
                activityList.innerHTML = '<li>No recent activity</li>';
            }
        })
        .catch(err => console.error('Error fetching recent activity:', err));

    // Add search functionality
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        fetch(`/dashboard/search?q=${query}`)
            .then(response => response.json())
            .then(data => {
                console.log('Search Results:', data);
                // Add logic to display search results dynamically
                alert(`Found ${data.books.length} books and ${data.users.length} users matching "${query}"`);
            })
            .catch(err => console.error('Error performing search:', err));
    });
});
