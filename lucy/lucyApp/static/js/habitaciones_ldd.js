// Manejo del botón agregar habitación
document.querySelector('.btn-agregar-habitacion').addEventListener('click', () => {
    console.log('Agregar nueva habitación');
    // Aquí iría la lógica para agregar una nueva habitación
});

// Manejo del botón confirmar
document.querySelector('.btn-confirmar').addEventListener('click', () => {
    console.log('Confirmar habitaciones');
    // Aquí iría la lógica para confirmar las habitaciones
});

// Manejo de botones editar
document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.habitacion-card');
        const nombre = card.querySelector('.habitacion-nombre').textContent;
        console.log('Editar habitación:', nombre);
        // Aquí iría la lógica para editar la habitación
    });
});
