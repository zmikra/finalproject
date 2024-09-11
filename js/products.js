

async function getproducts(url) {
    return fetch(url)
        .then(response => response.json())
        .then(productList => {
            showProducts(productList.products);
        });
}

function showProducts(productList) {
    let productsHTML = "";
    for (let i of productList) {
        productsHTML += `
        <div class="productItem">
            <div class="productImage">
                <img src="${i.image}" alt="${i.name}">
            </div>
            <div class="productDetails">
                <div class="productName">${i.name}</div>
                <div class="productDescription">${i.description}</div>
            </div>
            <div class="productPriceSold">
                <div class="productPrice">$${i.cost}</div>
                <div class="productSoldCount">Vendidos: ${i.soldCount}</div>
            </div>
        </div>`;
    }
    document.getElementById("tproducts").innerHTML = productsHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    getproducts("https://japceibal.github.io/emercado-api/cats_products/101.json");
});

