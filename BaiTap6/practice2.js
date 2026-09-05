async function fetchUserData() {
    try {
        const response = await fetch('https://api.example.com/foods');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const foodData = await response.json();
        // console.log(foodData);

        foodData.forEach(({id, name, price, description, ingredients}) => {
            console.log(`ID: ${id}, Name: ${name}, Price: ${price}, Description: ${description}, Ingredients: ${ingredients}`);
        });
    } catch (error) {
        console.error('Error fetching food data:', error);
    }
}

fetchUserData();