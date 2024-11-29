let mediaRecorder;
let audioChunks = [];
let isRecording = false; 


function sendAudioAsBase64(audioBlob) {
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64Audio = reader.result.split(',')[1];

        console.log(base64Audio)

        const url = '';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                file: base64Audio,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del backend:', data);
        })
        .catch(error => {
            console.error('Error al enviar el audio en base64:', error);
        });
    };

    // Leer el Blob como base64
    reader.readAsDataURL(audioBlob);
}

function initializeAudioRecorder() {
    return navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            window.mediaRecorder = mediaRecorder;

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
                console.log('Audio chunk recibido:', event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log('Grabación detenida. Blob de audio:', audioBlob);

                // Llamar a la nueva función para enviar como base64
                sendAudioAsBase64(audioBlob);

                audioChunks = [];
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

function startRecording() {
    if (isRecording) {
        console.log('Ya se está grabando.');
        return; 
    }

    if (mediaRecorder) {
        mediaRecorder.start();
        isRecording = true;
        console.log('Grabación iniciada');
    } else {
        console.error('mediaRecorder no está inicializado.');
    }
}

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

const startButton = document.getElementById('startButton');

if (startButton) {
    console.log('Botón Iniciar encontrado');

    startButton.removeEventListener('click', handleStartButtonClick);

    startButton.addEventListener('click', handleStartButtonClick);
} else {
    console.error('Botón startButton no encontrado en el DOM');
}

window.addEventListener('startTest', () => {
    navigateTo('/test-page');
});