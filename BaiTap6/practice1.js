async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const userData = await response.json();
        // console.log(userData);
        const {id, name, email, phone, address: {street, suite, city}, company: {name: companyName}} = userData;
        console.log(`ID: ${id}`);
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Phone: ${phone}`);
        console.log(`Address: ${street}, ${suite}, ${city}`);
        console.log(`Company: ${companyName}`);
        
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

fetchUserData();