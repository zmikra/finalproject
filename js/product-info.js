document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto desde el localStorage
    let productID = localStorage.getItem("productID");

    if (productID) {
        getJSONData(PRODUCT_INFO_URL + productID ).then(function (resultObj) {
            if (resultObj.status === "ok") {
                let product = resultObj.data;

                // Generar el HTML para mostrar los detalles del producto
                let productHTML = generateProductHTML(product);
                document.getElementById("product-info").innerHTML = productHTML;

                // Evento para añadir al carrito
                document.getElementById("setCart").addEventListener("click", function () {
                    addToCart(product, productID);
                });

                // Mostrar productos relacionados
                showRelatedProducts(product.relatedProducts);
            }
        });

        // Obtener los comentarios del producto
        getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + ".json").then(function (commentsResult) {
            if (commentsResult.status === "ok") {
                let comments = commentsResult.data;
                displayComments(comments);
            }
        });
    }

    // Función para generar las estrellas de la calificación
    function generateStars(rating) {
        let starsHTML = '';
        const maxStars = 5;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = maxStars - fullStars - halfStar;

        // Agregar estrellas completas
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<span class="fa fa-star checked"></span>';
        }

        // Agregar estrella media si aplica
        if (halfStar) {
            starsHTML += '<span class="fa fa-star-half-o checked"></span>';
        }

        // Agregar estrellas vacías
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<span class="fa fa-star"></span>';
        }

        return starsHTML;
    }

    if(productID){
    getJSONData(PRODUCT_INFO_COMMENTS_URL + productID ).then(function (commentsResult) {
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

    // Función para generar el HTML de los detalles del producto
    function generateProductHTML(product) {
        return `
            <div class="col-12 productDetails">
                <h1 class="productName">${product.name}</h1>
                <div class="productDetailSection">
                    <p class="productDescription">${product.description}</p>
                </div>
                <div class="productDetailSection">
                    <p class="productPrice">Precio: $${product.cost}</p>
                </div>
                <div class="divContainer">
                    <div class="productDetailSectionS">
                        <p class="productSoldCount">Vendidos: ${product.soldCount}</p>
                    </div>
                    <div class="cartBtn">
                        <button id="setCart">Añadir al carrito</button>
                    </div>
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
    }

    // Función para mostrar las imágenes del producto en el carrusel
    function showImages(images) {
        let htmlImages = "";
        for (let i = 0; i < images.length; i++) {
            if (i == 0) {
                htmlImages += `<div class="carousel-item active">
                    <img src="${images[0]}" class="d-block w-100" alt="...">
                </div>`;
            } else {
                htmlImages += `<div class="carousel-item">
                    <img src="${images[i]}" class="d-block w-100" alt="...">
                </div>`;
            }
        }
        return htmlImages;
    }

    // Función para añadir un producto al carrito
    function addToCart(product, productID) {
        let cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
        let article = {
            image: product.images[0],
            id: productID,
            name: product.name,
            count: 1,
            cost: product.cost,
            currency: "$"
        };

        const existingArticle = cart.articles.find(item => item.id === article.id);
        if (existingArticle) {
            existingArticle.count += 1;
        } else {
            cart.articles.push(article);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("¡Tu producto se ha añadido al carrito!");
        updateCartBadge();
    }

    // Evento para enviar una opinión
    document.querySelector(".submit-btn").addEventListener("click", () => {
        let opinionText = document.getElementById("opinion").value;
        let selectedStars = 0;
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].style.color === "orange") {
                selectedStars++;
            }
        }

        if (opinionText && selectedStars > 0) {
            let usuario = localStorage.getItem("nombre");
            let newCommentHTML = `
                <li class="list-group-item">
                    <div class="comment-header">
                        <h5 class="userName">${usuario}</h5>
                        <span class="datetime">${new Date().toLocaleString()}</span>
                        <div class="star-container">
                            ${generateStars(selectedStars)}
                        </div>
                    </div>
                    <p class="productDescription">${opinionText}</p>
                </li>
            `;

            document.getElementById("list").innerHTML += newCommentHTML;
            document.getElementById("opinion").value = '';
            for (let i = 0; i < stars.length; i++) {
                stars[i].style.color = 'lightgray';
            }
        } else {
            alert("Por favor, escribe un comentario y selecciona una calificación.");
        }
    });

    // Manejo de estrellas de calificación
    const stars = document.querySelectorAll('.star');

    
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
});
