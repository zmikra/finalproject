const ORDER_ASC_BY_PRICE = "PRICE_ASC";
const ORDER_DESC_BY_PRICE = "PRICE_DESC";
const ORDER_DESC_BY_RELEVANCE = "RELEVANCE_DESC";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let currentSearchInput = ""; 

// Función para ordenar los productos según el criterio seleccionado
function sortProducts(criteria, array) {
    let result = [];
//Cambio el if por un switch para acortar el código.
    switch (criteria) {
        case ORDER_ASC_BY_PRICE:
            result = array.sort((a, b) => a.cost - b.cost);
            break;
        case ORDER_DESC_BY_PRICE:
            result = array.sort((a, b) => b.cost - a.cost);
            break;
        case ORDER_DESC_BY_RELEVANCE:
            result = array.sort((a, b) => b.soldCount - a.soldCount);
            break;
        default:
            result = array;
            break;
    }
    return result;
}

// Función para mostrar los productos en la interfaz
function showProducts(productList, searchInput) {
    let productsHTML = "";

    // Filtrar productos por búsqueda
    if (searchInput !== undefined) {
        productList = productList.filter(p => 
            p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.description.toLowerCase().includes(searchInput.toLowerCase())
        );
    }

    // Mostrar productos dentro del rango de precio
    for (let i of productList) {
        if ((minPrice === undefined || parseFloat(i.cost) >= minPrice) &&
            (maxPrice === undefined || parseFloat(i.cost) <= maxPrice)) {
            productsHTML += `
            <div class="productItem" onclick="setProductID(${i.id})">
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

    // Si no se encontraron productos
    if (productsHTML === "") {
        productsHTML = "No se encontraron productos.";
    }

    document.getElementById("tproducts").innerHTML = productsHTML;
}

// Buscador.
document.getElementById("buscador").addEventListener("input", (event) => {
    currentSearchInput = event.target.value; // Actualiza el valor de la búsqueda
    showProducts(currentProductsArray, currentSearchInput); // Muestra los productos con el filtro de búsqueda
});

// Función para ordenar los productos según el criterio seleccionado
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    // Actualiza el array de productos y lo ordena
    if (productsArray !== undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(currentProductsArray, currentSearchInput);
}

// Punto 1: Cargar los productos cuando la página esté lista
document.addEventListener("DOMContentLoaded", function() {
    const catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProducts(currentProductsArray); // Mostrar productos cargados
        }
    });

    // Eventos para ordenar productos
    document.getElementById("sortPriceAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, currentProductsArray);
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, currentProductsArray);
    });

    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE, currentProductsArray);
    });

    // Evento para limpiar el filtro de precio
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(currentProductsArray);
    });

    // Evento para aplicar el filtro de precio
    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        minPrice = parseFloat(document.getElementById("rangeFilterPriceMin").value) || undefined;
        maxPrice = parseFloat(document.getElementById("rangeFilterPriceMax").value) || undefined;

        showProducts(currentProductsArray);
    });
});

// Función que guarda el ID del producto y redirige a la página de información del producto
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}
