// modal.js
// Lógica para mostrar y ocultar el modal de inicio de sesión

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('loginModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    if (openBtn && modal && closeBtn) {
        openBtn.onclick = () => modal.style.display = 'flex';
        closeBtn.onclick = () => modal.style.display = 'none';
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
});
