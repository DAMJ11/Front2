//variables globales 

let nombreProd = document.querySelector("#nombre-prod");
let precioProd = document.querySelector("#precio-prod");
let imagenProd = document.querySelector("#imagen-prod");
let descriopcionProd = document.querySelector("#descripcion-prod");
let btnGuardar = document.querySelector(".btn-guardar");
let listadoTbla = document.querySelector(".listado > tbody");

btnGuardar.addEventListener("click", () =>{
    let inforProd = validForm();
    if (inforProd == null ){
        return;
    }else{
        saveLocalStorage(inforProd);
        clearTable();
        getData();
    }
});

//Evento para recargar pagina 
document.addEventListener("DOMContentLoaded", () =>{
    getData();
});

function validForm(){
    let producto;
    if(nombreProd.value && precioProd.value && imagenProd.value &&
        descriopcionProd.value){
            // alert("Todo bien mi fafai")
            producto = {
                "nombre" : nombreProd.value,
                "precio" : precioProd.value,
                "imagen" : imagenProd.value,
                "descripcion" : descriopcionProd.value
            }
            nombreProd.value = "";
            precioProd.value = "";
            imagenProd.value = "";
            descriopcionProd.value = "";
    }else{
        alert("todo mal rey");
        // return;
    }
    console.log(producto);

    return producto;
}

//Funcion para guardar datos en el localStorage
function saveLocalStorage(pro){
    let productosGuardados = JSON.parse (localStorage.getItem("listado-prod")) || [];
    productosGuardados.push(pro);
    localStorage.setItem("listado-prod", JSON.stringify(productosGuardados));
    alert("producto guardado con exito")
}

//Funcion para mostrar datos el localStorage

function getData(){
    let productosGuardados = JSON.parse (localStorage.getItem("listado-prod")) || [];
    productosGuardados.forEach ((producto, i) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i+1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td>
                <img src="${producto.imagen}" width="40px">
            </td>
            <td>
                <button class="btn btn-warning" type="button">✍</button>
                <button class="btn btn-warning" type="button">🧨</button>
            </td>
            
        `;
    listadoTbla.appendChild(fila);

    });
};

//Function para eliminar tabla
function clearTable(){
    let allRows = document.querySelectorAll(".listado > tbody > tr");
    allRows.forEach((tr) => {
        tr.remove();
    });
};



// btnGuardar.addEventListener("click", ()=>{
//     // alert(nombreProd.value);
//     localStorage.setItem("nombre", nombreProd.value);
//     alert("Nombre guardado exitosamente");
// })

// //Mostrar dato guradado al recargar la pagina
// document.addEventListener("DOMContentLoaded", () => {
//     let nombre = localStorage.getItem("nombre");
//     let p = document.createElement("p");
//     p.textContent = nombre;
//     document.body.appendChild(p);
// })

// // localStorage.removeItem("nombre")