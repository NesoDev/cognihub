let mediaRecorder;
let audioChunks = [];
let isRecording = false; 


function sendAudio(audioBlob) {
    // Crear una URL para el blob de audio
    const url = URL.createObjectURL(audioBlob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'grabacion.wav'; 

    
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);  
    document.body.removeChild(a);
}

function initializeAudioRecorder() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            window.mediaRecorder = mediaRecorder;  // Hacer accesible desde ventana emergente

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
                console.log('Audio chunk recibido:', event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log('Grabación detenida. Blob de audio:', audioBlob);
                sendAudio(audioBlob);  // Llamada a sendAudio
                audioChunks = []; // Reiniciar audioChunks después de detener la grabación
            };

            mediaRecorder.onerror = (event) => {
                console.error('Error en MediaRecorder:', event.error);
            };

            console.log('MediaRecorder inicializado correctamente.');
        })
        .catch(error => {
            console.error('Error al acceder al micrófono:', error);
            return Promise.reject(error);
        });
}

// Función para iniciar la grabación
function startRecording() {
    if (isRecording) {
        console.log('Ya se está grabando.');
        return;  // Evitar iniciar grabación múltiples veces
    }

    if (mediaRecorder) {
        mediaRecorder.start();
        isRecording = true;
        console.log('Grabación iniciada');
    } else {
        console.error('mediaRecorder no está inicializado.');
    }
}

// Función para manejar el evento del botón
function handleStartButtonClick() {
    console.log('Botón Iniciar presionado');

    initializeAudioRecorder().then(() => {
        startRecording();

        // Abrir la ventana emergente solo una vez
        if (!window.popupWindow || window.popupWindow.closed) {
            const popupWindow = window.open('Pages/Controller/controller.html', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
            if (popupWindow) {
                console.log('Ventana emergente abierta correctamente.');
                window.popupWindow = popupWindow;
            } else {
                console.error('La ventana emergente fue bloqueada por el navegador.');
            }
        } else {
            console.log('La ventana emergente ya está abierta.');
        }
    }).catch(error => {
        console.error('Error inicializando el grabador:', error);
    });
}

// Botón para iniciar grabación y abrir ventana emergente
const startButton = document.getElementById('startButton');

if (startButton) {
    console.log('Botón Iniciar encontrado');

    // Eliminar el event listener previamente asignado (si existe)
    startButton.removeEventListener('click', handleStartButtonClick);

    // Asignar el event listener
    startButton.addEventListener('click', handleStartButtonClick);
} else {
    console.error('Botón startButton no encontrado en el DOM');
}
