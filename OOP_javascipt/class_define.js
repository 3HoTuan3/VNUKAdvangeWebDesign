class Product {
    id = 0;
    name = '';
    price= 0;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    displayInfo() {
        console.log(`Product ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`);
    }
}

const product1 = new Product(1, 'Laptop', 1200);
const product2 = new Product(2, 'Smartphone', 800);

product1.displayInfo();
product2.displayInfo();