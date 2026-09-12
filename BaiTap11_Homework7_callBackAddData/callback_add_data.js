//Hàm thêm dữ liệu vào API từ URL và gọi callback khi hoàn thành 
function addDataToAPI(url, data, callback) {
    fetch(url,
        {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }
    )
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(result => {
            callback(null, result);
        })

        .catch(error => {
            callback(error, null);
        });
}

//Hàm callback để xử lý kết quả sau khi thêm dữ liệu
function handleAddData(error, result) {
    if (error) {
        console.error('Error adding data:', error);
    } else {
        console.log('Data added successfully:', result);
    }
}

const apiUrl = 'https://6a9b87470ad174e139e8b375.mockapi.io/products';

const newData = {
    createAt: `2026-09-11T12:41:14.207Z`,
    name: 'Ao khoac mua dong',
    image1: 'https://example.com/image1.jpg',
    image2: 'https://example.com/image2.jpg',
    image3: 'https://example.com/image3.jpg',
    price: 100.45,
    tag: 'mua_dong',
    id: 51
};

// Gọi hàm addDataToAPI để thêm dữ liệu mới vào API
addDataToAPI(apiUrl, newData, handleAddData);