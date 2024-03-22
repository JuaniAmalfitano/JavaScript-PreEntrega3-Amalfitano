const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const validarUser = Users.find(user => user.email === email && user.password === password);
    if (!validarUser) {
        return Swal.fire({
            title: "Usuario y/o contraseña incorrectos!",
            icon: "error",
            timer: 2000
        });
    }
    
    Swal.fire({
        position: "center",
        icon: "success",
        title: `${getWelcomeMessage(validarUser.sexo, validarUser.name)}!`,
        showConfirmButton: false,
        timer: 2500
    });
    setTimeout(() => {
        localStorage.setItem('login_success', JSON.stringify(validarUser));
        window.location.href = '../index.html';
        limpiarLocalStorage()
    }, 2500);
});

// Función para obtener el mensaje de bienvenida según el sexo del usuario
function getWelcomeMessage(sexo, name) {
    if (sexo === 'masculino') {
        return `Bienvenido, ${name}!`;
    } else if (sexo === 'femenino') {
        return `Bienvenida, ${name}!`;
    } 
}

function limpiarLocalStorage() {
    localStorage.removeItem("CarritoCompras");
    carrito.length = 0;
    actualizarCarrito();
}
