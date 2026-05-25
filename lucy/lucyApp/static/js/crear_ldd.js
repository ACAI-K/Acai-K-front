// Manejo de botones de tipo de lugar (solo uno activo)
document.querySelectorAll('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remover clase active de todos
        document.querySelectorAll('.tipo-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Agregar clase active al clickeado
        btn.classList.add('active');
    });
});