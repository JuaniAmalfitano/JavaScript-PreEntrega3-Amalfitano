const carrito = JSON.parse(localStorage.getItem("CarritoCompras")) || [];

// Variable global para almacenar el número total de entradas
let totalEntradas = 0;

function actualizarTotalEntradas() {
    totalEntradas = carrito.reduce((total, pelicula) => total + pelicula.cantidad, 0);
    // Actualizar el número en la interfaz de usuario
    document.getElementById("total-entradas").textContent = totalEntradas.toString();
    // Guardar el número total en el almacenamiento local si lo necesitas
    localStorage.setItem("totalEntradas", totalEntradas.toString());
}

function agregarAlCarrito(id) {
    const pelicula = peliculas.find(pelicula => pelicula.id === id);
    if (pelicula) {
        const peliculaEnCarrito = carrito.find(item => item.id === id);
        if (peliculaEnCarrito) {
            peliculaEnCarrito.cantidad++;
        } else {
            pelicula.cantidad = 1;
            carrito.push(pelicula);
        }
        actualizarCarrito();
        guardarEnLocal();
        actualizarTotalEntradas();
    }
    Swal.fire({
        title: `<h4>${pelicula.titulo} agregada al carrito</h4>`,
        position: 'top-end',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
    });
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito-lista");
    carritoContainer.innerHTML = "";

    let total = 0;

    carrito.forEach(pelicula => {
        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("carrito-item");

        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.value = pelicula.cantidad;
        cantidadInput.min = 1;
        cantidadInput.addEventListener("change", function () {
            const cantidad = parseInt(this.value);
            if (cantidad < 1) {
                this.value = 1;
            }
            pelicula.cantidad = cantidad;
            actualizarCarrito();
            actualizarTotalEntradas();
        });

        const precioTotalItem = pelicula.precio * pelicula.cantidad;
        total += precioTotalItem;

        itemCarrito.innerHTML = `
        <img class="img-fluid fotoCarrito mt-3" src="../img/${pelicula.imagenURL}">
            <div class="carrito-item-info mt-4">
           
                <h4>${pelicula.titulo}</h4>
                <p>Precio unitario: $${pelicula.precio}</p>
                <p>Precio total: $${precioTotalItem}</p>
            </div>
            <button class="carrito-item-remove" onclick="removerDelCarrito(${pelicula.id})">Eliminar</button>
        `;

        itemCarrito.querySelector(".carrito-item-info").appendChild(cantidadInput);
        carritoContainer.appendChild(itemCarrito);

        const botonesEliminar = document.querySelectorAll(".carrito-item-remove");

        // Añadir evento click a cada botón de eliminar
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", function () {
                const id = parseInt(this.dataset.id);
                removerDelCarrito(id);
            });
        });
    });

    const totalCarrito = document.getElementById("carrito-total");
    totalCarrito.textContent = `$${total}`;

    localStorage.setItem("total", total);

    guardarEnLocal();
}

document.addEventListener("DOMContentLoaded", function () {
    // Recupera el último precio total del almacenamiento local
    const ultimoTotal = localStorage.getItem("total");

    document.getElementById("ultimo-total").textContent = `$${ultimoTotal}`;
});

function removerDelCarrito(id) {
    const indice = carrito.findIndex(item => item.id === id);
    if (indice !== -1) {
        carrito.splice(indice, 1);

        actualizarCarrito();

        guardarEnLocal();

        actualizarTotalEntradas();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Recuperar el último número total de entradas del almacenamiento local si lo necesitas
    const ultimoTotalEntradas = localStorage.getItem("totalEntradas");
    if (ultimoTotalEntradas !== null) {
        totalEntradas = parseInt(ultimoTotalEntradas);
        document.getElementById("total-entradas").textContent = totalEntradas.toString();
    }
    // Resto del código...
});

const irAPagar = document.getElementById("botonSwal");

irAPagar.addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: "Carrito VACIO!!",
            icon: "error",
            timer: 2000
        });
    } else {
        window.location = "../html/finalizarPagos.html";
        crearHtmlPagos();
        actualizarCarrito();
    }
});

const guardarEnLocal = () => {
    localStorage.setItem("CarritoCompras", JSON.stringify(carrito))
}

function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
}

const modal = document.getElementById("miModal");
const closeModal = document.getElementsByClassName("close")[0];
const confirmBtn = document.getElementById("confirmBtn");

///LIMPIAR EL CARRITO DESDE LOCAL STORAGE
function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
    carrito.length = 0;
    actualizarCarrito();
}

const abrirCarrito = document.getElementById('abrirCarrito');
const cerrarVentana = document.getElementById('cerrarVentana');
const ventanaLateral = document.getElementById('ventanaLateral');
const vaciarCarrito = document.getElementById("vaciarCarrito");

abrirCarrito.addEventListener('click', () => {
    ventanaLateral.classList.add('active');
});

cerrarVentana.addEventListener('click', () => {
    ventanaLateral.classList.remove('active');
});

vaciarCarrito.addEventListener('click', () => {
    Swal.fire({
        title: "Estas seguro de vaciar tu carrito?",
        showDenyButton: true,
        confirmButtonText: "Seguro",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if(carrito.length === 0) {
                Swal.fire({
                    title: "Carrito VACIO!!",
                    icon: "error",
                    timer: 2000
                });
            } else
            actualizarCarrito()
            limpiarLocalStorage();
            actualizarTotalEntradas()
        } else if (result.isDenied) {
            icon: "succes",
          Swal.fire 
          ("Tu carrito quedó como lo dejaste");
        }
      });
    
});

actualizarTotalEntradas();
actualizarCarrito();
