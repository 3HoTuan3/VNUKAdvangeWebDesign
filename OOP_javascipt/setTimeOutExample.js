console.log('Start of the program');

fetch('https://656ca88ee1e03bfd572e9c16.mockapi.io/products')
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


console.log('End of the program');