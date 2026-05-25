// Elementos
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');

// Click en la zona de carga
uploadZone.addEventListener('click', () => {
    fileInput.click();
});

// Prevenir comportamiento por defecto del drag and drop
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
});

uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
});

uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    // Obtener archivos del drop
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
    }
});

// Cambio de archivo
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        console.log('Archivo seleccionado:', fileInput.files[0].name);
    }
});
