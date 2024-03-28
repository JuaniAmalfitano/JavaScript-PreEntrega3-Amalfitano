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
    new Pelicula(11, "forrest gump", 1420, "forrest gump.jpg"),
    new Pelicula(12, "interstellar", 1690, "interstellar.jpg"),
    new Pelicula(13, "matrix", 1360, "matrix.jpg"),
    new Pelicula(14, "mansion embrujada", 1540, "mansion embrujada.jpg"),
    new Pelicula(15, "joker", 1420, "joker.jpg"),
    new Pelicula(16, "patos", 1390, "patos.jpg"),
];

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
                    <button class="btnComprar m-2" onclick="agregarAlCarrito(${id})">Agregar Al Carrito</button>
                </div>
            </div>
        `;

        fila.appendChild(card);

        if ((i + 1) % 4 === 0 || i === peliculas.length - 1) {
            contenedor.appendChild(fila);
        }
    }
}

function buscarPeliculas() {
    const inputBusqueda = document.getElementById("ingreso");
    const filtro = inputBusqueda.value.toLowerCase();

    const encontrados = peliculas.filter((pelicula) =>
        pelicula.titulo.toLowerCase().includes(filtro)
    );

    crearHtml(encontrados);
}

// Funcion para poder buscar las peliculas apretando el boton de buscar

const ingreso = document.querySelectorAll("input");

document.getElementById("btnSearch").addEventListener("click", buscarPeliculas);

const contenedor = document.querySelector("#contenedor");

// Funcion para poder buscar las peliculas apretando la tecla enter
document.getElementById("ingreso").addEventListener("keypress", checkEnterKey);

function checkEnterKey(event) {
    if (event.key === "Enter") {
        buscarPeliculas();
    }
}

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

const estadoServidor = (response) => {
    contenedor.innerHTML = `
    <div class="cargando-pelis text-center">
    <h4>Cargando peliculas y verificando estado del servidor</h4>
    <img class ="img-fluid" src="../img/pelicula.png" alt="">
    <img class ="img-fluid ms-2" src="../img/almacenamiento-del-servidor.png" alt="">
    </div>
`
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (response === true) {
                resolve(crearHtml(peliculas));
            } else {
                reject(window.location = "../html/serverCaido.html");
            }
        }, 2000);
    });
};

console.log(estadoServidor(true));


actualizarCarrito();
