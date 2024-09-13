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
                        <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${showImages(product.images)}
                            </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
                    `;

                document.getElementById("product-info").innerHTML = productHTML;
            }
        });
    }
});

function showImages(images) {
    let htmlImages = "";
    for(let i = 0; i < images.length; i++) {
        if(i == 0) {
            htmlImages += `<div class="carousel-item active">
                <img src=${images[0]} class="d-block w-100" alt="...">
            </div>`;
        } else {
            htmlImages += `<div class="carousel-item">
                <img src=${images[i]} class="d-block w-100" alt="...">
            </div>`;
        }
    }
    return htmlImages;
}

