function addProduct(newProduct) {
    return new Promise((resolve, reject) => {
        fetch(`https://6a9b87470ad174e139e8b375.mockapi.io/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newProduct)
        })
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

const newProduct = {
    createAt: `2026-09-12T13:41:14.207Z`,
    name: 'Quan mua dong',
    image1: 'https://example.com/image1.jpg',
    image2: 'https://example.com/image2.jpg',
    image3: 'https://example.com/image3.jpg',
    price: 100.45,
    tag: 'mua_dong_ao_khoac',
    id: 52
};

addProduct(newProduct)
    .then(addedProduct => {
        console.log('Sản phẩm mới đã được thêm:', addedProduct);
    })
    .catch(error => {
        console.error('Lỗi khi thêm sản phẩm:', error);
    });