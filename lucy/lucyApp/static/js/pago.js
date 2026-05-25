// Función para mostrar ayuda CVV
function mostrarHelpCVV() {
    alert('CVV (Código de Verificación de Valore) es un número de seguridad de 3 o 4 dígitos ubicado en el reverso de tu tarjeta de crédito/débito.');
}

// Formatear número de tarjeta con espacios
const cardNumberInput = document.querySelector('.card-number');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = formattedValue;
    });
}

// Permitir solo números en CVV
document.querySelectorAll('input[type="text"]').forEach(input => {
    if (input.maxLength === '3' || input.placeholder.includes('123')) {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
});
