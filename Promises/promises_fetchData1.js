function getProducts() {
    return new Promise((resolve, reject) => {
        fetch(`https://6a9b87470ad174e139e8b375.mockapi.io/products`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

getProducts()
    .then(products => {
        console.log('Danh sách sản phẩm:', products);
        console.log('Số lượng sản phẩm:', products.length);
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    });