function getProducts(callback) {
    fetch('https://6a9b87470ad174e139e8b375.mockapi.io/products')
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function handleProducts(error, products) {
    if (error) {
        console.error('Error fetching products:', error);
    } else {
        console.log('Fetched products:', products);
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = products.map(product => `<tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td><img src="${product.image1}" alt="${product.name}" width="100" "height="100"></td>
                            <td>${product.price}</td>
                        </tr>`).join('');
    }
}

getProducts(handleProducts);