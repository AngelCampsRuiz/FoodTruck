// Gestión del formulario de login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginSubmit = document.getElementById('loginSubmit');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Inicializar tooltips para todos los elementos con data-bs-toggle="tooltip"
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar los submenús desplegables
    document.querySelectorAll('.dropdown-submenu > a').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var submenu = this.nextElementSibling;
            if (submenu) {
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(function(menu) {
                        menu.style.display = 'none';
                    });
                    submenu.style.display = 'block';
                }
            }
        });
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
            
            // Mostrar mensaje de bienvenida
            welcomeMessage.textContent = `Benvingut ${username}`;
            welcomeMessage.style.display = 'block';
            
            // Ocultar botón login y mostrar logout
            document.querySelector('[data-bs-target="#loginModal"]').style.display = 'none';
            logoutBtn.style.display = 'block';
            
            // Cerrar el modal
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
        
        // Ocultar mensaje de bienvenida
        welcomeMessage.style.display = 'none';
        
        // Mostrar botón login y ocultar logout
        document.querySelector('[data-bs-target="#loginModal"]').style.display = 'block';
        logoutBtn.style.display = 'none';
        
        showAlert('info', 'Has tancat la sessió');
    });

    // Comprobar si el usuario está logueado al cargar la página
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username');
        
        // Mostrar mensaje de bienvenida
        welcomeMessage.textContent = `Benvingut ${username}`;
        welcomeMessage.style.display = 'block';
        
        // Ocultar botón login y mostrar logout
        document.querySelector('[data-bs-target="#loginModal"]').style.display = 'none';
        logoutBtn.style.display = 'block';
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
    const alertPlaceholder = document.createElement('div');
    alertPlaceholder.className = 'alert-container';
    document.body.appendChild(alertPlaceholder);
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    alertPlaceholder.append(wrapper);
    
    // Eliminar la alerta después de 3 segundos
    setTimeout(function() {
        wrapper.querySelector('.alert').classList.remove('show');
        setTimeout(function() {
            alertPlaceholder.remove();
        }, 300);
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

// Gestión de la paginación
document.addEventListener('DOMContentLoaded', function() {
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageItems = document.querySelectorAll('.pagination .page-item:not(:first-child):not(:last-child)');
    
    // Mostrar solo los primeros 5 números de página
    let currentPage = 0;
    const itemsPerPage = 5;
    
    function updatePagination() {
        pageItems.forEach((item, index) => {
            if (index >= currentPage && index < currentPage + itemsPerPage) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Actualizar estado de los botones prev/next
        prevPageBtn.parentElement.classList.toggle('disabled', currentPage === 0);
        nextPageBtn.parentElement.classList.toggle('disabled', currentPage + itemsPerPage >= pageItems.length);
    }
    
    // Inicializar paginación
    updatePagination();
    
    // Manejar clic en "Anterior"
    prevPageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage > 0) {
            currentPage -= itemsPerPage;
            updatePagination();
        }
    });
    
    // Manejar clic en "Següent"
    nextPageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (currentPage + itemsPerPage < pageItems.length) {
            currentPage += itemsPerPage;
            updatePagination();
        }
    });
}); 