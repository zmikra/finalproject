// Verificar si la sesión está activa
if (sessionStorage.getItem("sesionActiva") !== "true") {
    // Redireccionar a login.html si no está autenticado
    window.location.href = "login.html";
}else {
    // Mostrar el nombre de usuario en la esquina superior derecha
    var usuario = sessionStorage.getItem("usuario");
    document.getElementById("nombreUsuario").textContent =  usuario;
}

async function getproducts(url) {
        return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(productList=>{
            showProducts(productList.products);
        })
    }
    function showProducts(productList){
        let productsHTML="";
        for (let i of productList){
            productsHTML += `<tr>
                          <td><img src=${i.image} width="100" height="auto"></td>
                          <td>${i.name}</td>
                          <td>${i.description}</td>
                          <td>${i.cost}</td>
                          <td>${i.soldCount}</td>
                        </tr>`
        }
        document.getElementById("tproducts").innerHTML = productsHTML;
    }
document.addEventListener("DOMContentLoaded", function(e){
    getproducts("https://japceibal.github.io/emercado-api/cats_products/101.json");
});

