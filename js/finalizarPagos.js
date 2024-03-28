const btnFinCompra = document.getElementById("btnFinCompra");

btnFinCompra.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores de los campos
    const nombreYApellidoTitular = document.getElementById("nombreYApellidoTitular").value;
    const cardNumberInputs = document.querySelectorAll(".card-number-input");
    const expiration = document.getElementById("expiration").value;
    const cvc = document.querySelector(".cvc-input").value;

    // Verificar si algún campo está vacío
    if (!nombreYApellidoTitular.trim() || Array.from(cardNumberInputs).some(input => !input.value.trim()) || !expiration.trim() || !cvc.trim()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor completa todos los campos antes de confirmar la compra.",
        });
    } else {

        // Si todos los campos están completos, mostrar mensaje de éxito
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tu compra ha sido confirmada",
            showConfirmButton: false,
            timer: 1500
        });


        // Redirigir o realizar otras acciones después de un tiempo
        setTimeout(() => {
            window.location = "../html/cartelera.html";
            limpiarLocalStorage();
            actualizarCarrito();
            actualizarTotalEntradas();
        }, 2000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    mostrarResumenCompra();
});

function mostrarResumenCompra() {
    const resumenCompraContainer = document.getElementById("resumen-compra");
    resumenCompraContainer.innerHTML = "";

    let total = 0;

    carrito.forEach(pelicula => {
        const precioTotalItem = pelicula.precio * pelicula.cantidad;
        total += precioTotalItem;

        const itemResumen = document.createElement("div");

        itemResumen.innerHTML = `
        <div class ="carrito-item mt-4 carrito-item-resumen">  
        <img class="img-fluid fotoCarrito mt-3" src="../img/${pelicula.imagenURL}" alt="">
        <div class="titulo-container">
        <h4>${pelicula.titulo}</h4>
      </div>
  <p class ="mt-3">Cant.: ${pelicula.cantidad}</p>
  <h5>Precio: $${precioTotalItem}</h5>
  </div>
  `;

        resumenCompraContainer.appendChild(itemResumen);
    });

    const totalResumen = document.getElementById("TotalResumen")

    totalResumen.innerHTML = `
    <h3 class="totalResumen mt-4">Total:$${total}</h3>
    `
}