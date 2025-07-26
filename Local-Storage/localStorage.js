//variables globales 

let nombreProd = document.querySelector("#nombre-prod");
let precioProd = document.querySelector("#precio-prod");
let imagenProd = document.querySelector("#imagen-prod");
let descriopcionProd = document.querySelector("#descripcion-prod");
let btnGuardar = document.querySelector(".btn-guardar");
let listadoTbla = document.querySelector(".listado > tbody");
let buscador = document.querySelector("#buscador");
let btnExportar = document.querySelector(".btn-exportar");

btnGuardar.addEventListener("click", () =>{
    let inforProd = validForm();
    if (inforProd == null ){
        return;
    }
    if (editandoIndex !== null) {
        // Actualizar producto
        let productosGuardados = JSON.parse(localStorage.getItem("listado-prod")) || [];
        productosGuardados[editandoIndex] = inforProd;
        localStorage.setItem("listado-prod", JSON.stringify(productosGuardados));
        editandoIndex = null;
        btnGuardar.textContent = "Submit";
        btnGuardar.classList.remove("btn-success");
        btnGuardar.classList.add("btn-primary");
        alert("Producto actualizado con éxito");
    } else {
        saveLocalStorage(inforProd);
    }
    clearTable();
    getData(buscador.value);
});

buscador.addEventListener("input", () => {
    clearTable();
    getData(buscador.value);
});

btnExportar.addEventListener("click", () => {
    exportarPDF();
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

function getData(filtro = ""){
    let productosGuardados = JSON.parse (localStorage.getItem("listado-prod")) || [];
    let productosFiltrados = productosGuardados.filter(producto => {
        let texto = filtro.toLowerCase();
        return producto.nombre.toLowerCase().includes(texto) || producto.descripcion.toLowerCase().includes(texto);
    });
    productosFiltrados.forEach ((producto, i) => {
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
                <button class="btn-editar btn btn-warning" type="button" data-index="${i}">✍</button>
                <button class="btn-borrar btn btn-danger" type="button" data-index="${i}">🧨</button>
            </td>
        `;
        listadoTbla.appendChild(fila);
    });
    // Asignar eventos a los botones de editar y borrar
    document.querySelectorAll('.btn-borrar').forEach(btn => {
        btn.addEventListener('click', function() {
            borrarProducto(parseInt(this.getAttribute('data-index')));
        });
    });
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', function() {
            editarProducto(parseInt(this.getAttribute('data-index')));
        });
    });
}

function borrarProducto(index) {
    let productosGuardados = JSON.parse(localStorage.getItem("listado-prod")) || [];
    productosGuardados.splice(index, 1);
    localStorage.setItem("listado-prod", JSON.stringify(productosGuardados));
    clearTable();
    getData(buscador.value);
}

let editandoIndex = null;
function editarProducto(index) {
    let productosGuardados = JSON.parse(localStorage.getItem("listado-prod")) || [];
    let producto = productosGuardados[index];
    nombreProd.value = producto.nombre;
    precioProd.value = producto.precio;
    imagenProd.value = producto.imagen;
    descriopcionProd.value = producto.descripcion;
    editandoIndex = index;
    btnGuardar.textContent = "Actualizar";
    btnGuardar.classList.remove("btn-primary");
    btnGuardar.classList.add("btn-success");
}

// Exportar listado a PDF
function exportarPDF() {
    // Asegúrate de tener jsPDF en tu proyecto
    // CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    const productosGuardados = JSON.parse(localStorage.getItem("listado-prod")) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Listado de Productos", 10, 10);
    let y = 20;
    productosGuardados.forEach((producto, i) => {
        doc.text(`${i+1}. Nombre: ${producto.nombre} | Precio: ${producto.precio} | Desc: ${producto.descripcion}`, 10, y);
        y += 10;
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });
    doc.save("listado_productos.pdf");
}

//Function para eliminar tabla
function clearTable(){
    let allRows = document.querySelectorAll(".listado > tbody > tr");
    allRows.forEach((tr) => {
        tr.remove();
    });
};

