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

// Configurar event listener para el botón de inicio
document.getElementById('startButton').addEventListener('click', function() {
    // Inicializar el grabador de audio y comenzar la grabación
    initializeAudioRecorder();
    startRecording();

    // Abrir la ventana emergente con la página de controlador
    const popupWindow = window.open('Pages/Controller/controller.html', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
});

window.addEventListener('startTest', () => {
    navigateTo('/test-page');
});
