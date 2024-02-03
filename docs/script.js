document.addEventListener('DOMContentLoaded', function () {
    // Fetch product data from API
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            // Ensure the data structure is correct
            if (data && data.categories && Array.isArray(data.categories)) {
                // render products with the fetched data
                console.log(data.categories[0]);
                renderProducts('men', data.categories[0].category_products);
                renderProducts('women', data.categories[1].category_products);
                renderProducts('kids', data.categories[2].category_products);
                console.log("hii");
            } else {
                console.error('Invalid data structure:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Initial tab display
    showProducts('men');
});

function renderProducts(category, products) {
    const productsContainer = document.getElementById(`${category}Products`);

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        let badgeHTML = '';
        if (product.badge_text !== null) {
        badgeHTML = `<button class="badge">${product.badge_text}</button>`;
        }

        productCard.innerHTML = `
            <div>
            ${badgeHTML}
            <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details">
            <div class="pd-first">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-vendor">${product.vendor}</p>
            </div>
            <div class="pd-second">
                <p class="p-price">Rs ${product.price}</p>
                <p class="p-c-price">₹${parseFloat(product.compare_at_price).toFixed(2)}</p>
                <p class="p-p-off">${Math.round(calculateDiscount(product.price, product.compare_at_price))}% off</p>
            </div>
            
        </div>
        <button class="add-to-cart-button">Add to Cart</button>
            
        `;

        productsContainer.appendChild(productCard);
    });
}


function showProducts(category) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const categoryTab = Array.from(tabs).find(tab => tab.textContent.toLowerCase() === category);
    if (categoryTab) {
        categoryTab.classList.add('active');
    }

    const productContainers = document.querySelectorAll('.product-container');
    productContainers.forEach(container => container.style.display = 'none');

    document.getElementById(`${category}Products`).style.display = 'flex';
}

function calculateDiscount(price, compareAtPrice) {
    return ((compareAtPrice - price) / compareAtPrice * 100).toFixed(2);
}
