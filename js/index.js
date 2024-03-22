const user = JSON.parse(localStorage.getItem('login_success')) || false
if (!user) {
    window.location.href = '../html/iniciarSesion.html'
}

if (user) {
    const loginLinks = document.querySelectorAll('.login-links');
    loginLinks.forEach(link => {
        link.style.display = 'none';
    });
}

const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    Swal.fire({
        title: "¿Estás seguro que quieres cerrar sesión?",
        text: "Se eliminarán las peliculas de tu carrito",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí",
        denyButtonText: "No",

    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Sesión cerrada exitosamente!",
                iconHtml: '<img src="../img/cara-triste.png" class="custom-icon">',
                showConfirmButton: false
            });
            localStorage.removeItem('login_success');
            setTimeout(() => {
                window.location.href = '../html/iniciarSesion.html';
            }, 2500); // Redireccionar después de 2 segundos
        } else if (result.isDenied) {
            Swal.fire("Sigues con la sesión iniciada!");
        }
    });

//se cierra la ventana automaticamente si no respondiste nada
    setTimeout(() => {
        Swal.close();
    }, 15000);
});


