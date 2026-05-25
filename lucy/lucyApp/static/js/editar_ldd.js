// Actualizar título cuando cambia el nombre del lugar
const nombreInput = document.querySelector('.nombre-lugar');
const tituloLugar = document.querySelector('.titulo-lugar');

nombreInput.addEventListener('input', () => {
    tituloLugar.textContent = nombreInput.value || 'Sin nombre';
});

// Manejo de botones de tipo de lugar (solo uno activo)
document.querySelectorAll('.editar-tipo .tipo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover clase active de todos
        document.querySelectorAll('.editar-tipo .tipo-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Agregar clase active al clickeado
        btn.classList.add('active');
    });
});