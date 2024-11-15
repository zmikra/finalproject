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
            
                /* Entrega 6, punto 2, botón "añadir al carrito"*/
                //añado evento de clic al botón 
                document.getElementById("setCart").addEventListener("click", function() {
                    //intento tomar los datos del localstorage, si no hay datos anteriores crea un array nuevo
                    let cart = JSON.parse(localStorage.getItem("cart")) || { articles: [] };
                    let article = {
                        image : product.images[0],
                        id: productID,
                        name: product.name,
                        count: 1,
                        cost: product.cost,
                        currency: "$" 
                    };

                    // verifico si el producto ya está en el carrito para no repetirlo
                    const existingArticle = cart.articles.find(item => item.id === article.id);
                    if (existingArticle) {
                        existingArticle.count += 1; //si ya tengo el mismo artículo, le suma uno a count
                    } else {
                        cart.articles.push(article); //si no tengo artículo con ese id, lo agrega
                    }

                    localStorage.setItem("cart", JSON.stringify(cart)); //guarda el array en localstorage
                    alert("¡Tu producto se ha añadido al carrito!"); // alerta de éxito
                    updateCartBadge();
                });

                // Carga los productos relacionados
                showRelatedProducts(product.relatedProducts);

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

    //DESAFIATE
    //hago evento al hacer click en el botón de enviar opinión
    document.querySelector(".submit-btn").addEventListener("click", () => {
        //tomo el valor string ingresado en el textarea
        let opinionText = document.getElementById("opinion").value;
        //defino una variable para que contenga las estrellas que marque como calificación
        let selectedStars = 0;
            
        //uso un bucle for para contar cuántas estrellas se marcaron
        for (let i = 0; i < stars.length; i++) {
            if (stars[i].style.color === "orange") {
                selectedStars++;
            }
        }
        //uso un if que tenga como condición el valor true de opinionText y que haya + de 0 estrellas seleccionadas
        if (opinionText && selectedStars > 0) {
            let commentsList = document.getElementById("list");
            let usuario = localStorage.getItem("nombre")    
            // creo variable newCommentHTML que tome los datos del comentario, fecha, hora y estrellas
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
                    
            // agrego el nuevo comentario a la lista de comentarios ya existente
            commentsList.innerHTML += newCommentHTML;
            
            // limpio textarea y estrellas
            document.getElementById("opinion").value = '';
            for (let i = 0; i < stars.length; i++) {
                stars[i].style.color = 'lightgray';
            }
            } else {
                alert("Por favor, escribe un comentario y selecciona una calificación.");
            }
    }); //FIN DESAFIATE


    // Funcion para mostrar los productos relacionados
    function showRelatedProducts (relatedProducts) {
        let relatedHTML= "";
        for (let i=0; i<relatedProducts.length; i++) {
            let product = relatedProducts[i];
            relatedHTML += `
                <div class="col-3 related-product" data-id="${product.id}">
                    <h5 class="related-product-title">${product.name}</h5>   
                    <img src="${product.image}" alt="${product.name}" class="img-fluid"> 
                </div>
            `;
        }

        document.querySelector(".related-products-list").innerHTML = relatedHTML;

        // Agrega evento de click para cada related product
        let relatedItems = document.querySelectorAll(".related-product");
        for (let i=0; i<relatedItems.length; i++) {
            relatedItems[i].addEventListener("click", function() {
                let newProductID = relatedItems[i].getAttribute("data-id");
                localStorage.setItem("productID", newProductID);
                window.location.href = "product-info.html";
            });
        }
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