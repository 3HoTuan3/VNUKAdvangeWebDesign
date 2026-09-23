const products = [
    { id: 1, name: "Product 1", price: 10.99, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQkAk9I-5lnBSsVdJA_WXzieZQZpPkD9k5qAYNuhRxpQbqGqJmq8524rDJRU62ro2mBSSNG6drQSqrwtBUl0XU_2ilZXewqjQ"},
    { id: 2, name: "Product 2", price: 19.99, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR3dWvdnZU_mJvkonCe6W5IXMLSTvEUfGt2BZgVna_bZeH_ENHKCCFneKWDDMkTh4qJpiBCsJ6Kbg5r95VaND4rkrLs72sl-LhADTol4gAE9t6hBQOOL_bylA"},
    { id: 3, name: "Product 3", price: 5.99, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQTEExEUJ9eCMAgq74zImDSiL4kD_LdvSHAzpfVIv0uA04P97f_ysieS0U4dJRwhffPk95kjCCTOAOPzsvOMv0DNC9trWQfHohznJRAmKIsHczyRqpvsJ33"},
];

//Hàm lấy tất cả sản phẩm
exports.getAll = () => products;

//Hàm lấy sản phẩm theo ID
exports.getById = (id) => products.find(p => p.id == id);

exports.add = (product) => products.push(product);