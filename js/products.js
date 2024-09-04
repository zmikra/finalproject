const ORDER_ASC_BY_PRICE = "PRICE_ASC";
const ORDER_DESC_BY_PRICE = "PRICE_DESC";
const ORDER_DESC_BY_RELEVANCE = "RELEVANCE_DESC";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;

// Verificar si la sesión está activa
if (sessionStorage.getItem("sesionActiva") !== "true") {
    // Redireccionar a login.html si no está autenticado
    window.location.href = "login.html";
} else {
    // Mostrar el nombre de usuario en la esquina superior derecha
    var usuario = sessionStorage.getItem("usuario");
    document.getElementById("nombreUsuario").textContent = usuario;
}

/*async function getproducts(url) {
    return fetch(url)
        .then(response => response.json())
        .then(productList => {
            showProducts(productList.products);*/
            
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return a.cost - b.cost;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {
            return b.cost - a.cost;
        });
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        result = array.sort(function(a, b) {
            return b.soldCount - a.soldCount;
        });
    }
    return result;
}

function showProducts(productList) {
    let productsHTML = "";
    for (let i of productList) {
        if (((minPrice == undefined) || (parseFloat(i.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (parseFloat(i.cost) <= maxPrice))) {

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
    }
    document.getElementById("tproducts").innerHTML = productsHTML;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(currentProductsArray);
}

document.addEventListener("DOMContentLoaded", function() {
    let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProducts(currentProductsArray);
        }
    });

    document.getElementById("sortPriceAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(currentProductsArray);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseFloat(minPrice)) >= 0) {
            minPrice = parseFloat(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseFloat(maxPrice)) >= 0) {
            maxPrice = parseFloat(maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProducts(currentProductsArray);
    });
});
