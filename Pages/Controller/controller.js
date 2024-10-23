// Funciones para pausar, reanudar y detener la grabación
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        console.log('Grabación detenida');
    }
}

function pauseRecording() {
    if (mediaRecorder) {
        mediaRecorder.pause();
        console.log('Grabación pausada');
    }
}

function resumeRecording() {
    if (mediaRecorder) {
        mediaRecorder.resume();
        console.log('Grabación reanudada');
    }
}

// Configurar event listeners para los botones de control
function setupEventListeners() {
    const stopButton = document.getElementById('stopBtn');
    const pauseButton = document.getElementById('pauseBtn');
    const resumeButton = document.getElementById('resumeBtn');

    if (stopButton) {
        stopButton.addEventListener('click', stopRecording);
    }

    if (pauseButton) {
        pauseButton.addEventListener('click', pauseRecording);
    }

    if (resumeButton) {
        resumeButton.addEventListener('click', resumeRecording);
    }
}

// Asegúrate de que esto se ejecute cuando el DOM esté listo
window.onload = () => {
    setupEventListeners(); // Asigna los listeners de los botones
};
