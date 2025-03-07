// Gestión del formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginSubmit = document.getElementById('loginSubmit');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

    // Inicializar tooltips para todos los elementos con data-bs-toggle="tooltip"
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Manejar el envío del formulario
    loginSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simulación de autenticación
        if (username && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            document.querySelector('[data-bs-target="#loginModal"]').style.display = 'none';
            logoutBtn.style.display = 'block';
            
            // Mostrar mensaje de bienvenida
            const welcomeMsg = document.createElement('span');
            welcomeMsg.id = 'welcomeMessage';
            welcomeMsg.className = 'navbar-text me-3';
            welcomeMsg.innerHTML = `Benvingut ${username}`;
            document.querySelector('.navbar-nav.ms-auto').prepend(welcomeMsg);
            
            loginModal.hide();
            showAlert('success', 'Has iniciat sessió correctament!');
        } else {
            showAlert('danger', 'Usuari o contrasenya incorrectes');
        }
    });

    // Manejar el logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        document.querySelector('[data-bs-target="#loginModal"]').style.display = 'block';
        logoutBtn.style.display = 'none';
        
        // Eliminar mensaje de bienvenida
        const welcomeMsg = document.getElementById('welcomeMessage');
        if (welcomeMsg) welcomeMsg.remove();
        
        showAlert('info', 'Has tancat la sessió');
    });

    // Comprobar si el usuario está logueado al cargar la página
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username');
        document.querySelector('[data-bs-target="#loginModal"]').style.display = 'none';
        logoutBtn.style.display = 'block';
        
        // Mostrar mensaje de bienvenida si hay un elemento navbar-nav.ms-auto
        const navbarRight = document.querySelector('.navbar-nav.ms-auto');
        if (navbarRight && username) {
            const welcomeMsg = document.createElement('span');
            welcomeMsg.id = 'welcomeMessage';
            welcomeMsg.className = 'navbar-text me-3';
            welcomeMsg.innerHTML = `Benvingut ${username}`;
            navbarRight.prepend(welcomeMsg);
        }
    }

    // Manejar los likes/dislikes
    document.querySelectorAll('.fa-thumbs-up, .fa-thumbs-down').forEach(icon => {
        icon.addEventListener('click', function() {
            if (localStorage.getItem('isLoggedIn') === 'true') {
                this.classList.toggle('text-primary');
                showAlert('success', 'Gràcies per la teva valoració!');
            } else {
                showAlert('warning', 'Has d\'iniciar sessió per valorar');
            }
        });
    });
});

// Función para mostrar alertas
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '1050';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Gestión del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recoger los datos del formulario
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Simulación de envío
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showAlert('success', 'Missatge enviat correctament!');
            
            // Resetear formulario
            contactForm.reset();
        });
    }
}); 