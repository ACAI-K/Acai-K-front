// Actualizar título cuando cambia el nombre de la habitación
const nombreInput = document.querySelector('.nombre-habitacion');
const tituloHabitacion = document.querySelector('.titulo-habitacion');

nombreInput.addEventListener('input', () => {
    tituloHabitacion.textContent = nombreInput.value || 'Sin nombre';
});

// Contador de caracteres en descripción
const textarea = document.querySelector('.descripcion-habitacion');
const charCount = document.querySelector('.caracteres-count .count');

textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
});

// Manejo de botones + y -
document.querySelectorAll('.numero-input').forEach(group => {
    const btnMenos = group.querySelector('.btn-menos');
    const btnMas = group.querySelector('.btn-mas');
    const input = group.querySelector('.numero-field');

    btnMenos.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value) || 0;
        if (value > 0) {
            input.value = value - 1;
        }
    });

    btnMas.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value) || 0;
        input.value = value + 1;
    });
});
