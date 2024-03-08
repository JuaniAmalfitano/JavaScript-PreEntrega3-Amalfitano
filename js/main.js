// CLASE PELICULA CON SU TITULO, FORMATO, PRECIO Y ENTRADAS DISPONIBLES
function Pelicula(id, titulo, formato, precio, disponibles, imagenURL) {
    this.id = id;
    this.titulo = titulo;
    this.formato = formato;
    this.precio = precio;
    this.disponibles = disponibles;
    this.imagenURL = imagenURL; // Ruta relativa a la carpeta "img"
}

// AARRAY DE 10 PELICULAS
const peliculas = [
    new Pelicula(1, "el señor de los anillos", "2D", 2300, 14, "el senior de los anillos.jpg"),
    new Pelicula(2, "harry potter", "3D", 1200, 30, "harry potter.jpg"),
    new Pelicula(3, "el titanic", "4D", 2600, 24, "titanic.jpg"),
    new Pelicula(4, "avatar", "4D", 2500, 13, "avatar.jpg"),
    new Pelicula(5, "jurassic park", "2D", 2000, 42, "jurassic park.jpg"),
    new Pelicula(6, "star wars", "3D", 2200, 31, "star wars.jpg"),
    new Pelicula(7, "inception", "2D", 2400, 9, "inception.jpg"),
    new Pelicula(8, "the avengers", "4D", 1800, 3, "the avengers.jpg"),
    new Pelicula(9, "the godfather", "2D", 2700, 76, "the godfather.jpg"),
    new Pelicula(10, "the dark knight", "3D", 2300, 19, "the dark knight.jpg"),
];



//Funciones de búsqueda
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
    // Llamo al elemento contenedor
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    // Iterar sobre las películas
    for (let i = 0; i < peliculas.length; i++) {
        // Cada 4 películas, abrir una nueva fila
        if (i % 4 === 0) {
            var fila = document.createElement("div");
            fila.classList.add("row");
        }

        // Crear la tarjeta de la película
        const card = document.createElement("div");
        card.classList.add("col-xl-3"); // Bootstrap column class
        card.classList.add("col-sm-6"); // Bootstrap column class
        card.classList.add("col-md-3"); // Bootstrap column class
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

        // Cada 4 películas, cerrar la fila y agregarla al contenedor
        if ((i + 1) % 4 === 0 || i === peliculas.length - 1) {
            contenedor.appendChild(fila);
        }
    }
}


crearHtml(peliculas);

/*

function crearHtmlCarrito(peliculas) {
    // Limpia el contenido del contenedor del carrito
    carrito.innerHTML = "";

    // Crear HTML para cada película en el carrito
    peliculas.forEach((el) => {
        let htmlCarrito = `
            <div class="row">
                <div class="col-3 mt-0">
                    <h2 class="nombreProd mt-0">${el.titulo}</h2>
                </div>
                <div class="col-2 mt-0">
                    <p class="precioProd mt-0">$${el.precio}</p>
                </div>
            </div>
        `;

        // Agrega el HTML al contenedor del carrito
        carrito.innerHTML += htmlCarrito;
    });
}

*/


const carrito = [];

function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito-lista");
    carritoContainer.innerHTML = ""; // Limpiar el contenido actual del carrito

    // Iterar sobre las películas en el carrito y agregarlas al HTML del carrito
    carrito.forEach(pelicula => {
        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("carrito-item"); // Clase para estilizar los elementos del carrito
        itemCarrito.innerHTML = `
            <div class="carrito-item-info mt-4">
                <h4>${pelicula.titulo}</h4>
                <p>Precio: $${pelicula.precio}</p>
            </div>
            <button class="carrito-item-remove" onclick="removerDelCarrito(${pelicula.id})">Eliminar</button>
        `;
        carritoContainer.appendChild(itemCarrito);
    });

    // Calcular el total del carrito
    const totalCarrito = document.getElementById("carrito-total");
    const total = carrito.reduce((acc, pelicula) => acc + pelicula.precio, 0);
    totalCarrito.textContent = `$${total}`;
}

    
// Manejador de eventos para agregar películas al carrito
function agregarAlCarrito(id) {
    const pelicula = peliculas.find(pelicula => pelicula.id === id);
    if (pelicula) {
        carrito.push(pelicula);
        actualizarCarrito();
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
inputSearch.addEventListener("keyup", () => {
    const filtrado = buscarServicio(peliculas, inputSearch.value)
    crearHtml(filtrado)
});

//FUNCIONES PARA BOTONES DE ORDENAMIENTO

function ordenarPorPrecioMenor(peliculas) {
    return peliculas.slice().sort((a, b) => a.precio - b.precio);
}

function ordenarPorPrecioMayor(peliculas) {
    return peliculas.slice().sort((a, b) => b.precio - a.precio);
}

function ordenarPorRelevancia(peliculas) {
    return peliculas
}

const selectOrdenar = document.getElementById("selectOrdenar");

selectOrdenar.addEventListener("change", () => {
    const opcionSeleccionada = selectOrdenar.value;
    let peliculasOrdenadas;

    if (opcionSeleccionada === "relevantes") {
        peliculasOrdenadas = ordenarPorRelevancia(peliculas);
    }
    if (opcionSeleccionada === "menorAMayor") {
        peliculasOrdenadas = ordenarPorPrecioMenor(peliculas);
    } else if (opcionSeleccionada === "mayorAMenor") {
        peliculasOrdenadas = ordenarPorPrecioMayor(peliculas);
    }

    crearHtml(peliculasOrdenadas);
});

console.log(carrito);