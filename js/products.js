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
                          <td><img src=${i.image}</td>
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
