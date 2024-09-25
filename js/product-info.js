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
    //PUNTO 2 ENTREGA 4
    //función que genera estrellas para la calificación
    function generateStars(rating) {
        let starsHTML = '';
        const maxStars = 5; // Máximo de estrellas a mostrar
    
        const fullStars = Math.floor(rating); // calcula cuántas estrellas completas hay
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;  /*verifica si hay al menos 0.5 en la calificación 
        para agregar una media estrella*/
        const emptyStars = maxStars - fullStars - halfStar; /*determina cuántas estrellas vacías se necesitan, 
        restando las estrellas completas y la media estrella*/
    
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<span class="fa fa-star checked"></span>';
        }
        if (halfStar) {
            starsHTML += '<span class="fa fa-star-half-o checked"></span>';
        }
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class="fa fa-star"></span>';
        }
    
        return starsHTML;
    }

    if(productID){
    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + ".json").then(function (commentsResult) {
        if (commentsResult.status === "ok") {
            let comments = commentsResult.data;
            let commentsHTML = `
                                 <h4 class="comments-title">Opiniones del producto</h4>
                               `;
    
            // Usando un bucle for para iterar sobre los comentarios
            for (let i = 0; i < comments.length; i++) {
                let comment = comments[i];
                commentsHTML += `
                    <li class="list-group-item">
                      <div class="comment-header">
                        <h5 class="userName">${comment.user}</h5>
                        <span class="datetime">${comment.dateTime}</span>
                        <div class="star-container">
                          ${generateStars(comment.score)}
                        </div>
                    </div>
                    <p class="productDescription">${comment.description}</p>
                    </li>
                `;
            }
    
            document.getElementById("list").innerHTML = commentsHTML;
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

//tu opinion estrellas
const stars = document.querySelectorAll('.star');
    
// Evento click para pintar estrellas
stars.forEach(star => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.style.color = 'lightgray'); // Resetear todas
        for (let i = 0; i < star.dataset.value; i++) {
            stars[i].style.color = 'orange'; // Pintar hasta la seleccionada
        }
    });

    // Evento doble clic para despintar todas las estrellas
    star.addEventListener('dblclick', () => {
        stars.forEach(s => s.style.color = 'lightgray'); // Resetear todas las estrellas
    });
});