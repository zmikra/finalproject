//Creo las variables similares a las que tenemos en categories.js 
const ORDER_ASC_BY_PRICE = "PRICE_ASC";
const ORDER_DESC_BY_PRICE = "PRICE_DESC";
const ORDER_DESC_BY_RELEVANCE = "RELEVANCE_DESC";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minPrice = undefined;
let maxPrice = undefined;
let currentSearchInput = ""; //  variable global para almacenar el texto de búsqueda

/*creo función para hacerle sort a los productos y ordenarlos según los criterios manejados de la entrega.
Este sort los ordena haciendo uso de una función anónima*/
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        //organiza los productos del más barato al más caro
        result = array.sort(function(a, b) {
            return a.cost - b.cost;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        //organiza los productos del más caro al más barato
        result = array.sort(function(a, b) {
            return b.cost - a.cost;
        });
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        //organiza los productos según la relevancia (del más vendido al menos vendido)
        result = array.sort(function(a, b) {
            return b.soldCount - a.soldCount;
        });
    }
    return result;
}

function showProducts(productList, searchInput) {
    let productsHTML = "";

    // si filtra por texto:
    if (searchInput != undefined) {
        // mantener unicamente los elementos que coinciden con la busqueda
        productList = productList.filter(p => {
            return p.name.toLowerCase().includes(searchInput.toLowerCase())
            || p.description.toLowerCase().includes(searchInput.toLowerCase())
        });
    }
    for (let i of productList) {
        if (((minPrice == undefined) || (parseFloat(i.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (parseFloat(i.cost) <= maxPrice))) {

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

    if (productsHTML === "") {
        productsHTML = "No se encontraron productos.";
    }

    document.getElementById("tproducts").innerHTML = productsHTML;
}

document.getElementById("buscador").addEventListener("input", (event) => {
    currentSearchInput = event.target.value; // Actualiza el valor de la búsqueda globalmente
    showProducts(currentProductsArray, currentSearchInput); // Usa el valor almacenado en currentSearchInput

});

//esta función toma el criterio con el cual vamos a ordenar los productos y el array mismo
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
//si se le pasa la lista de productos (el array), lo guarda en currentProductsArray y después usa la
//función sortProducts para ordenar según el criterio (currentSortCriteria) y por último los muestra
//con showProducts
    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(currentProductsArray, currentSearchInput);
}
//PUNTO 1:
document.addEventListener("DOMContentLoaded", function() {
    //toma los datos de catID, luego de recibirlos verifica que estén ok (if) y los muestra con showproducts
    let catId = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catId + ".json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products;
            showProducts(currentProductsArray);
        }
    });
//FIN PUNTO 1.
//líneas de código de eventos:
//al hacer clic ordena los productos de menor a mayor
    document.getElementById("sortPriceAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
//al hacer clic ordena los productos de mayor a menor
    document.getElementById("sortPriceDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
//al hacer clic ordena los productos por relevancia
    document.getElementById("sortByRelevance").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
    });
//al hacer clic limpia los campos de filtro de precio y muestra los productos de nuevo
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(currentProductsArray);
    });
//al hacer clic toma los valores introducidos, los convierte a números y muestra los productos dentro 
//de ese rango. 
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

//funcion que guarda el id y te redirige al product-info.html
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}