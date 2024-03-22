// CLASE PELICULA CON SU TITULO, FORMATO, PRECIO Y ENTRADAS DISPONIBLES
function Pelicula(id, titulo, precio, imagenURL) {
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
    this.imagenURL = imagenURL;
}

// ARRAY DE 10 PELICULAS
const peliculas = [
    new Pelicula(1, "el señor de los anillos", 2300, "el senior de los anillos.jpg"),
    new Pelicula(2, "harry potter", 1200, "harry potter.jpg"),
    new Pelicula(3, "titanic", 2600, "titanic.jpg"),
    new Pelicula(4, "avatar", 2500, "avatar.jpg"),
    new Pelicula(5, "jurassic park", 2000, "jurassic park.jpg"),
    new Pelicula(6, "star wars", 2200, "star wars.jpg"),
    new Pelicula(7, "inception", 2400, "inception.jpg"),
    new Pelicula(8, "the avengers", 1800, "the avengers.jpg"),
    new Pelicula(9, "the godfather", 2700, "the godfather.jpg"),
    new Pelicula(10, "the dark knight", 2300, "the dark knight.jpg"),
];

function buscarServicio(arr, filtro) {
    const encontrados = arr.filter((el) => {
        return el.titulo.toLowerCase().includes(filtro.toLowerCase());
    });
    return encontrados;
}

function filtrarServicio(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.titulo.includes(filtro);
    });
    return filtrado;
}

const ingreso = document.querySelectorAll("input"),
    btnSearch = document.querySelector("#btnSearch"),
    contenedor = document.querySelector("#contenedor");


const inputBusqueda = ingreso[0];

///PARA BUSCAR CON EL ENTER
inputBusqueda.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const encontrados = buscarServicio(peliculas, inputBusqueda.value);
        crearHtml(encontrados);
    }
});

///PARA BUSCAR DANDOLE CLICK EN EL BOTON "BUSCAR"
btnSearch.addEventListener("click", () => {
    const encontrados = buscarServicio(peliculas, inputBusqueda.value)
    crearHtml(encontrados)
});

///PARA BUSCAR SIN APRETAR NINGUN BOTON NI TECLA
/*
inputBusqueda .addEventListener("keyup", () => {
    const filtrado = buscarServicio(peliculas, inputBusqueda .value)
    crearHtml(filtrado)
});
*/

//FUNCIONES PARA BOTONES DE ORDENAMIENTO

function ordenarPorRelevancia(peliculas) {
    return peliculas
}

function ordenarPorPrecioMenor(peliculas) {
    return peliculas.slice().sort((a, b) => a.precio - b.precio);
}

function ordenarPorPrecioMayor(peliculas) {
    return peliculas.slice().sort((a, b) => b.precio - a.precio);
}

function ordenarAlfabeticamente(peliculas) {
    return peliculas.slice().sort((a, b) => {
        // Compara los títulos de las películas de forma alfabética
        const tituloA = a.titulo.toLowerCase();
        const tituloB = b.titulo.toLowerCase();
        if (tituloA < tituloB) return -1;
        if (tituloA > tituloB) return 1;
        return 0;
    });
}

const selectOrdenar = document.getElementById("selectOrdenar");

selectOrdenar.addEventListener("change", () => {
    const opcionSeleccionada = selectOrdenar.value;
    let peliculasOrdenadas;

    if (opcionSeleccionada === "relevancia") {
        peliculasOrdenadas = ordenarPorRelevancia(peliculas);
    }
    if (opcionSeleccionada === "alfabeticamente") {
        peliculasOrdenadas = ordenarAlfabeticamente(peliculas);
    }
    if (opcionSeleccionada === "menorAMayor") {
        peliculasOrdenadas = ordenarPorPrecioMenor(peliculas);
    } else if (opcionSeleccionada === "mayorAMenor") {
        peliculasOrdenadas = ordenarPorPrecioMayor(peliculas);
    }

    crearHtml(peliculasOrdenadas);
});

function crearHtml(peliculas) {

    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    for (let i = 0; i < peliculas.length; i++) {

        if (i % 4 === 0) {
            var fila = document.createElement("div");
            fila.classList.add("row");
        }

        const card = document.createElement("div");
        card.classList.add("col-xl-3");
        card.classList.add("col-sm-6");
        card.classList.add("col-md-3");

        const { imagenURL, titulo, precio, id } = peliculas[i];

        card.innerHTML = `
    <div class="card">
        <img class="img-fluid" src="../img/${imagenURL}" alt="${titulo}">
        <hr>
        <div>
            <h3 class="text-center ContenedorTitulo">${titulo}</h3>
        </div>
        <p class="text-center precio">Precio: $${precio}</p>
        <div class="containerComprar">
            <button class="btnComprar m-2" onclick="agregarAlCarrito(${id})">Agregar</button>
        </div>
    </div>
`;

        fila.appendChild(card);

        if ((i + 1) % 4 === 0 || i === peliculas.length - 1) {
            contenedor.appendChild(fila);
        }
    }
}


const carrito = JSON.parse(localStorage.getItem("CarritoCompras")) || [];

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
    }
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

    guardarEnLocal();
}

function removerDelCarrito(id) {
    const indice = carrito.findIndex(item => item.id === id);
    if (indice !== -1) {
        carrito.splice(indice, 1);

        actualizarCarrito();

        guardarEnLocal();
    }
}

function crearHtmlPagos(peliculas) {

    const contenedorPagos = document.getElementById("PasarAPagar");
    contenedorPagos.innerHTML = "";


    const medioDePago = document.createElement("div");
    medioDePago.innerHTML = `
        <div class="containerr">
        <section class="container-pasarela text-center mt-5 row">
          <h4>Pasarela de pago</h4>
          <input class="mb-2 mt-2" type="text" id="nombreYApellidoTitular" placeholder="Nombre y Apellido del titular">
          <div class="card-number">
            <input type="text" maxlength="4" placeholder="1111" class="card-number-input" required>
            <input type="text" maxlength="4" placeholder="2222" class="card-number-input" required>
            <input type="text" maxlength="4" placeholder="3333" class="card-number-input" required>
            <input type="text" maxlength="4" placeholder="4444" class="card-number-input" required>
          </div>
          <div>
            <input type="text" maxlength="4" placeholder="MM/YY" id="expiration" required>
            <input type="text" maxlength="3" placeholder="CVC" class="cvc-input" required>
          </div>
  
          <div class="MediosDePago">
            <img src="../img/mediosDePago/mastercard@2x.png" alt="mastercard">
            <img src="../img/mediosDePago/visa@2x.png" alt="visa">
            <img src="../img/mediosDePago/mercadopago@2x.png" alt="mercadopago">
            <img src="../img/mediosDePago/pagofacil@2x.png" alt="pagofacil">
            <img src="../img/mediosDePago/rapipago@2x.png" alt="rapipago">
            <img src="../img/mediosDePago/tarjeta-naranja@2x.png" alt="tarjeta naranja">
          </div>

          <button class="btnFinCompra mt-4">Confirmar compra</button>

  
        </section>
      </div>
        `;

    contenedorPagos.appendChild(medioDePago);

}

const irAPagar = document.getElementById("botonSwal");

irAPagar.addEventListener("click", () => {
    crearHtmlPagos()
})

const expirationInput = document.getElementById("expiration");

expirationInput.addEventListener("keyup", function (e) {
    let input = event.target;
    let value = input.value.replace(/\D/g, '');

    if (value.length === 2 && event.keyCode !== 8) {
        input.value = value + '/';
    }
});

const guardarEnLocal = () => {
    localStorage.setItem("CarritoCompras", JSON.stringify(carrito))
}

function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
}

const btnFinCompra = document.getElementsByClassName("btnFinCompra");
const modal = document.getElementById("miModal");
const closeModal = document.getElementsByClassName("close")[0];
const confirmBtn = document.getElementById("confirmBtn");

btnFinCompra.addEventListener = function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}

///LIMPIAR EL CARRITO DESDE LOCAL STORAGE
function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
    carrito.length = 0;
    actualizarCarrito();
}


crearHtml(peliculas);

actualizarCarrito();