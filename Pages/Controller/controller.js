let mediaRecorder;
let audioChunks = [];

// Función para inicializar el grabador de audio
function initializeAudioRecorder() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
                console.log('Audio chunk recibido: ', event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log('Grabación detenida. Blob de audio: ', audioBlob);
                sendAudio(audioBlob);  
                audioChunks = []; // Reiniciar audioChunks después de detener la grabación
            };

            mediaRecorder.onpause = () => {
                console.log('Grabación pausada (evento onpause detectado)');
            };

            mediaRecorder.onresume = () => {
                console.log('Grabación reanudada (evento onresume detectado)');
            };

            mediaRecorder.onerror = (event) => {
                console.error('Error en MediaRecorder:', event.error);
            };
        })
        .catch(error => console.error('Error al acceder al micrófono:', error));
}

// Función para iniciar la grabación
function startRecording() {
    if (mediaRecorder) {
        mediaRecorder.start();
        console.log('Grabación iniciada');
    }
}

// Función para detener la grabación
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
        console.log('Grabación detenida');
    }
}

// Función para pausar la grabación
function pauseRecording() {
    if (mediaRecorder) {
        mediaRecorder.pause();
        console.log('Grabación pausada');
    }
}

// Función para reanudar la grabación
function resumeRecording() {
    if (mediaRecorder) {
        mediaRecorder.resume();
        console.log('Grabación reanudada');
    }
}

// Configurar event listeners para los botones
function setupEventListeners() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopBtn');
    const pauseButton = document.getElementById('pauseBtn');
    const resumeButton = document.getElementById('resumeBtn');

    if (startButton) {
        startButton.addEventListener('click', () => {
            startRecording();
            startButton.disabled = true;
            if (stopButton) stopButton.disabled = false;
            if (pauseButton) pauseButton.disabled = false; // Habilitar botón de pausa
        });
    }

    if (stopButton) {
        stopButton.addEventListener('click', () => {
            stopRecording();
            if (startButton) startButton.disabled = false;
            stopButton.disabled = true;
            if (pauseButton) pauseButton.disabled = true; // Deshabilitar botón de pausa
            if (resumeButton) resumeButton.disabled = true; // Deshabilitar botón de reanudar
        });
    }

    if (pauseButton) {
        pauseButton.addEventListener('click', () => {
            pauseRecording();
            pauseButton.disabled = true;
            if (resumeButton) resumeButton.disabled = false; // Habilitar botón de reanudar
        });
    }

    if (resumeButton) {
        resumeButton.addEventListener('click', () => {
            resumeRecording();
            resumeButton.disabled = true;
            if (pauseButton) pauseButton.disabled = false; // Habilitar botón de pausa
        });
    }
}

// Asegurarte de que esto se ejecuta cuando el DOM esté listo
window.onload = () => {
    console.log('Ventana emergente cargada, inicializando audio...');
    initializeAudioRecorder();  // Inicializa la grabadora de audio
    setupEventListeners();      // Asigna los listeners de los botones
};
