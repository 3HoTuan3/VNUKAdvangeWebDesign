async function fetchUserData() {
    const tableBody = document.getElementById('user-table-body');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const users = await response.json();

        tableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.street}</td>
                <td>${user.address.city}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error fetching user data:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="5">Không thể tải dữ liệu người dùng.</td>
            </tr>
        `;
    }
}

fetchUserData();