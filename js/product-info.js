document.addEventListener("DOMContentLoaded", function () {
    let productID = localStorage.getItem("productID");

    if (productID) {
        getJSONData(PRODUCT_INFO_URL + productID + ".json").then(function (resultObj) {
            if (resultObj.status === "ok") {
                let product = resultObj.data;

                let productHTML = `
                    <div class="col-12 productDetails">
                        <h1 class="productName">${product.name}</h1>
                        <div class="productDetailSection">
                            <p class="productDescription">${product.description}</p>
                        </div>
                        <div class="productDetailSection">
                            <p class="productPrice">Precio: $${product.cost}</p>
                        </div>
                        <div class="productDetailSection">
                            <p class="productSoldCount">Vendidos: ${product.soldCount}</p>
                        </div>
                    </div>
                    <div class="col-12 productImage">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                `;

                document.getElementById("product-info").innerHTML = productHTML;
            }
        });
    }
});
