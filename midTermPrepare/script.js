// Store the product data and API configuration.
const API_URL = 'https://6a9b87470ad174e139e8b375.mockapi.io/products';
let products = [];
let selectedProductId = null;

// Cache the DOM elements used by the application.
const productList = document.getElementById('product-list');
const productModal = document.getElementById('product-modal');
const productForm = document.getElementById('product-form');
const productSearch = document.getElementById('product-search');

// Represent a product and generate its display markup.
class Product {
    // Create a product object from API data.
    constructor(id, name, image, description, quantity, price, productLocation, starProduct, saleOff) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.quantity = quantity;
        this.price = Number(price);
        this.productLocation = productLocation;
        this.starProduct = Number(starProduct);
        this.saleOff = Number(saleOff);
    }

    // Calculate the price after applying the discount.
    getDiscountedPrice() {
        if (this.saleOff <= 0) return this.price;
        return this.price - (this.price * this.saleOff / 100);
    }

    // Format a number as Vietnamese currency.
    formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Generate the star rating markup.
    getStarsHTML() {
        const validStars = Math.max(0, Math.min(5, this.starProduct));
        const fullStars = '★'.repeat(validStars);
        const emptyStars = '☆'.repeat(5 - validStars);
        return `<span class="stars">${fullStars}${emptyStars}</span>`;
    }

    // Generate the product card markup.
    generateHTML() {
        const discountedPrice = this.getDiscountedPrice();
        let priceSectionHTML = '';
        let saleTagHTML = '';

        if (this.saleOff > 0) {
            priceSectionHTML = `
                <div class="price-container">
                    <span class="new-price">${this.formatCurrency(discountedPrice)}</span>
                    <span class="old-price">${this.formatCurrency(this.price)}</span>
                </div>
            `;
            saleTagHTML = `<div class="sale-tag">-${this.saleOff}%</div>`;
        } else {
            priceSectionHTML = `
                <div class="price-container">
                    <span class="new-price">${this.formatCurrency(this.price)}</span>
                </div>
            `;
        }

        return `
            <div class="product-card" id="product-${this.id}">
                ${saleTagHTML}
                <img src="${this.image}" alt="${this.name}">
                <div class="product-info">
                    <h3 class="product-name">${this.name}</h3>
                    ${priceSectionHTML}
                    <div class="product-meta">
                        <span class="quantity-sold">Đã bán ${this.quantity}</span>
                        ${this.getStarsHTML()}
                        <span class="location">${this.productLocation}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Load all products from the API.
function fetchProducts() {
    return new Promise((resolve, reject) => {
        fetch(API_URL)
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

// Render the supplied products into the product grid.
function renderProducts(productItems) {
    productList.innerHTML = productItems.map(item => {
        const product = new Product(
            item.id,
            item.name,
            item.image,
            item.description,
            item.quantity,
            item.price,
            item.productLocation,
            item.starProduct,
            item.saleOff
        );
        return product.generateHTML();
    }).join('');
}

// Return products whose names match the search term.
function filterProducts(searchTerm) {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
        return products;
    }

    return products.filter(product => String(product.name || '')
        .toLowerCase()
        .includes(normalizedSearchTerm));
}

// Open the form for adding or updating a product.
function openProductModal(product = null) {
    productForm.reset();
    document.getElementById('modal-title').textContent = product ? 'Update Product' : 'Add Product';
    document.getElementById('product-id').value = product?.id || '';
    document.getElementById('product-name').value = product?.name || '';
    document.getElementById('product-image').value = product?.image || '';
    document.getElementById('product-description').value = product?.description || '';
    document.getElementById('product-quantity').value = product?.quantity ?? 0;
    document.getElementById('product-price').value = product?.price ?? 0;
    document.getElementById('product-location').value = product?.productLocation || '';
    document.getElementById('product-stars').value = product?.starProduct ?? 0;
    document.getElementById('product-sale-off').value = product?.saleOff ?? 0;
    productModal.hidden = false;
    document.getElementById('product-name').focus();
}

// Hide the product form modal.
function closeProductModal() {
    productModal.hidden = true;
}

// Read and convert the submitted form values.
function getProductFormData() {
    const formData = new FormData(productForm);
    return {
        name: formData.get('name'),
        image: formData.get('image'),
        description: formData.get('description'),
        quantity: Number(formData.get('quantity')),
        price: Number(formData.get('price')),
        productLocation: formData.get('productLocation'),
        starProduct: Number(formData.get('starProduct')),
        saleOff: Number(formData.get('saleOff'))
    };
}

// Delete a selected product from the API.
function deleteProduct(productId) {
    if (!productId) {
        alert('Vui lòng chọn một sản phẩm trước khi xóa.');
        return;
    }

    if (!confirm('Bạn có chắc muốn xóa sản phẩm này không?')) return;

    fetch(`${API_URL}/${productId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error('Không thể xóa sản phẩm');
            return fetchProducts();
        })
        .then(data => {
            products = data;
            renderProducts(products);
            selectedProductId = null;
        })
        .catch(error => {
            console.error('Lỗi xóa sản phẩm:', error);
            alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
        });
}

// Select a product card when it is clicked.
productList.addEventListener('click', event => {
    const card = event.target.closest('.product-card');
    if (!card) return;

    selectedProductId = card.id.replace('product-', '');
    document.querySelectorAll('.product-card.selected').forEach(selectedCard => {
        selectedCard.classList.remove('selected');
    });
    card.classList.add('selected');
});

// Search product list.
productSearch.addEventListener('input', event => {
    renderProducts(filterProducts(event.target.value));
});

// Handle Add, Update, and Delete toolbar actions.
document.querySelector('.toolbar').addEventListener('click', event => {
    const action = event.target.dataset.action;

    if (action === 'add') {
        openProductModal();
    }

    if (action === 'update') {
        const product = products.find(item => String(item.id) === String(selectedProductId));
        if (!product) {
            alert('Vui lòng chọn một sản phẩm trước khi cập nhật.');
            return;
        }
        openProductModal(product);
    }

    if (action === 'delete') {
        deleteProduct(selectedProductId);
    }
});

// Close the modal from its close and cancel buttons.
document.getElementById('close-modal').addEventListener('click', closeProductModal);
document.querySelector('[data-action="cancel"]').addEventListener('click', closeProductModal);

// Save a new or updated product through the API.
productForm.addEventListener('submit', event => {
    event.preventDefault();
    const productId = document.getElementById('product-id').value;
    const method = productId ? 'PUT' : 'POST';

    fetch(productId ? `${API_URL}/${productId}` : API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getProductFormData())
    })
        .then(response => {
            if (!response.ok) throw new Error('Không thể lưu sản phẩm');
            return fetchProducts();
        })
        .then(data => {
            closeProductModal();
            products = data;
            renderProducts(products);
            selectedProductId = productId || null;
        })
        .catch(error => {
            console.error('Lỗi lưu sản phẩm:', error);
            alert('Không thể lưu sản phẩm. Vui lòng thử lại.');
        });
});

// Fetch and display products when the page starts.
fetchProducts()
    .then(data => {
        products = data;
        renderProducts(products);
    })
    .catch(error => {
        console.error('Lỗi khi lấy dữ liệu:', error);
    });
