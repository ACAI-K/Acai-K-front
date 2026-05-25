// Botón copiar código
const btnCopiar = document.querySelector('.btn-copiar');
const confirmacionCode = document.querySelector('.confirmacion-code');

btnCopiar.addEventListener('click', () => {
    const codigo = confirmacionCode.textContent;
    navigator.clipboard.writeText(codigo).then(() => {
        // Cambiar icono temporalmente
        const iconoOriginal = btnCopiar.innerHTML;
        btnCopiar.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            btnCopiar.innerHTML = iconoOriginal;
        }, 2000);
    });
});
