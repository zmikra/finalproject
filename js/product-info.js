document.addEventListener("DOMContentLoaded", function () {
    const productID = localStorage.getItem("productID");

    // Cargar producto
    if (productID) {
        getJSONData(PRODUCT_INFO_URL + productID).then(function (resultObj) {
            if (resultObj.status === "ok") {
                const product = resultObj.data;
                displayProductDetails(product);
                loadProductComments(productID);
                showRelatedProducts(product.relatedProducts);
            }
        });
    }

    // Función que genera estrellas para la calificación
    function generateStars(rating) {
        let starsHTML = '';
        const maxStars = 5;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = maxStars - fullStars - halfStar;

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

    // Mostrar detalles del producto
    function displayProductDetails(product) {
        const productHTML = `
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
        document.getElementById("product-info").innerHTML = productHTML;

        // Añadir al carrito
        document.getElementById("setCart").addEventListener("click", function () {
            addToCart(product);
        });
    }

    // Función para agregar producto al carrito
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
        const article = {
            image: product.images[0],
            id: productID,
            name: product.name,
            count: 1,
            cost: product.cost,
            currency: "$"
        };

        // Verificar si el producto ya está en el carrito
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

    // Cargar comentarios
    function loadProductComments(productID) {
        getJSONData(PRODUCT_INFO_COMMENTS_URL + productID).then(function (commentsResult) {
            if (commentsResult.status === "ok") {
                const comments = commentsResult.data;
                displayComments(comments);
            }
        });
    }

    // Mostrar comentarios
    function displayComments(comments) {
        let commentsHTML = '<h4 class="comments-title">Opiniones del producto</h4>';
        comments.forEach(comment => {
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
        });
        document.getElementById("list").innerHTML = commentsHTML;
    }

    // Mostrar productos relacionados
    function showRelatedProducts(relatedProducts) {
        let relatedHTML = "";
        relatedProducts.forEach(product => {
            relatedHTML += `
                <div class="col-3 related-product" data-id="${product.id}">
                    <h5 class="related-product-title">${product.name}</h5>
                    <img src="${product.image}" alt="${product.name}" class="img-fluid">
                </div>
            `;
        });
        document.querySelector(".related-products-list").innerHTML = relatedHTML;

        // Agregar evento de clic para productos relacionados
        document.querySelectorAll(".related-product").forEach(item => {
            item.addEventListener("click", function () {
                const newProductID = item.getAttribute("data-id");
                localStorage.setItem("productID", newProductID);
                window.location.href = "product-info.html";
            });
        });
    }

    // Mostrar imágenes del producto
    function showImages(images) {
        return images.map((image, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image}" class="d-block w-100" alt="...">
            </div>
        `).join('');
    }

    // Manejo de la opinión con estrellas
    const stars = document.querySelectorAll('.star');

    // Evento click para pintar estrellas
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.style.color = 'lightgray');
            for (let i = 0; i < star.dataset.value; i++) {
                stars[i].style.color = 'orange';
            }
        });

        // Evento doble clic para despintar todas las estrellas
        star.addEventListener('dblclick', () => {
            stars.forEach(s => s.style.color = 'lightgray');
        });
    });

    // Enviar opinión
    document.querySelector(".submit-btn").addEventListener("click", () => {
        const opinionText = document.getElementById("opinion").value;
        let selectedStars = 0;

        stars.forEach(star => {
            if (star.style.color === "orange") {
                selectedStars++;
            }
        });

        if (opinionText && selectedStars > 0) {
            const usuario = localStorage.getItem("nombre");
            const newCommentHTML = `
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
            stars.forEach(s => s.style.color = 'lightgray');
        } else {
            alert("Por favor, escribe un comentario y selecciona una calificación.");
        }
    });
});
