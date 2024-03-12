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
        card.innerHTML = `
            <div class="card">
                <img class="img-fluid" src="../img/${peliculas[i].imagenURL}" alt="${peliculas[i].titulo}">
                <hr>
                <div>
                    <h3 class="text-center ContenedorTitulo">${peliculas[i].titulo}</h3>
                </div>
                <p class="text-center precio">Precio: $${peliculas[i].precio}</p>
                <div class="containerComprar">
                    <button class="btnComprar m-2" onclick="agregarAlCarrito(${peliculas[i].id})">Agregar</button>
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
        cantidadInput.addEventListener("change", function() {
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
            <div class="carrito-item-info mt-4">
                <h4>${pelicula.titulo}</h4>
                <p>Precio unitario: $${pelicula.precio}</p>
                <p>Precio total: $${precioTotalItem}</p>
            </div>
            <button class="carrito-item-remove" onclick="removerDelCarrito(${pelicula.id})">Eliminar</button>
        `;
        
        itemCarrito.querySelector(".carrito-item-info").appendChild(cantidadInput);
        carritoContainer.appendChild(itemCarrito);
    });

    const totalCarrito = document.getElementById("carrito-total");
    totalCarrito.textContent = `$${total}`;

    guardarEnLocal();
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
    }
}

const ingreso = document.querySelectorAll("input"),
    btnSearch = document.querySelector("#btnSearch"),
    contenedor = document.querySelector("#contenedor");
    

const inputSearch = ingreso[0];


///PARA BUSCAR CON EL ENTER
inputSearch.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const encontrados = buscarServicio(peliculas, inputSearch.value);
        crearHtml(encontrados);
    }
});

///PARA BUSCAR DANDOLE CLICK EN EL BOTON "BUSCAR"
btnSearch.addEventListener("click", () => {
    const encontrados = buscarServicio(peliculas, inputSearch.value)
    crearHtml(encontrados)
});

///PARA BUSCAR SIN APRETAR NINGUN BOTON NI TECLA
/*
inputSearch.addEventListener("keyup", () => {
    const filtrado = buscarServicio(peliculas, inputSearch.value)
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

const guardarEnLocal = () => {
    localStorage.setItem("CarritoCompras", JSON.stringify (carrito))
}

function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
}

const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
const modal = document.getElementById("miModal");
const closeModal = document.getElementsByClassName("close")[0];
const confirmBtn = document.getElementById("confirmBtn");

      btnFinalizarCompra.onclick = function () {
          modal.style.display = "block";
      }

      closeModal.onclick = function () {
          modal.style.display = "none";
      }

      confirmBtn.onclick = function () {
          modal.style.display = "none";
          limpiarLocalStorage();
      }

      ///LIMPIAR EL CARRITO DESDE LOCAL STORAGE
    function limpiarLocalStorage() {
        localStorage.removeItem("CarritoCompras");
        carrito.length = 0;
    actualizarCarrito(); 
    }


crearHtml(peliculas);

actualizarCarrito();
