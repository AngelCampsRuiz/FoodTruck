document.getElementById('loginSubmit').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        document.querySelector('.navbar-brand').insertAdjacentHTML('afterend', 
            `<span class="navbar-text">Benvingut ${username}</span>`);
        document.getElementById('logoutBtn').style.display = 'block';
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    }
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    document.querySelector('.navbar-text')?.remove();
    this.style.display = 'none';
});

// Inicializar todos los tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
}); 