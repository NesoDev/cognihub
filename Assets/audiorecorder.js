function initializeAudioRecorder() {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
                console.log('Audio chunk recibido: ', event.data);  // Verifica que el fragmento de audio se capture
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log('Grabación detenida. Blob de audio: ', audioBlob);  // Verifica que el blob de audio se genere
                sendAudio(audioBlob);  // Aquí puedes enviar el audio al servidor o procesarlo
                toggleStop();
            };

            mediaRecorder.onpause = () => {
                console.log('Grabación pausada (evento onpause detectado)');
                togglePause();
            };

            mediaRecorder.onresume = () => {
                console.log('Grabación reanudada (evento onresume detectado)');
                toggleResume();
            };

            mediaRecorder.onerror = (event) => {
                console.error('Error en MediaRecorder:', event.error);
            };

        })
        .catch(error => console.error('Error accessing microphone:', error));

        function startRecording() {
            if (mediaRecorder) {
                audioChunks = [];
                mediaRecorder.start();
                console.log('Grabación iniciada, estado del MediaRecorder:', mediaRecorder.state);
            }
        }
    
        function pauseRecording() {
            if (mediaRecorder && mediaRecorder.state === 'recording') {
                mediaRecorder.pause();
                console.log('Grabación pausada, estado del MediaRecorder:', mediaRecorder.state);
            } else {
                console.log('Error: No se puede pausar la grabación. Estado actual:', mediaRecorder ? mediaRecorder.state : 'No inicializado');
            }
        }
    
        function resumeRecording() {
            if (mediaRecorder && mediaRecorder.state === 'paused') {
                mediaRecorder.resume();
                console.log('Grabación reanudada, estado del MediaRecorder:', mediaRecorder.state);
            } else {
                console.log('Error: No se puede reanudar la grabación. Estado actual:', mediaRecorder ? mediaRecorder.state : 'No inicializado');
            }
        }
    
        function stopRecording() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                console.log('Grabación detenida, estado del MediaRecorder:', mediaRecorder.state);
                toggleStop();
            } else {
                console.log('Error: No se puede detener la grabación. Estado actual:', mediaRecorder ? mediaRecorder.state : 'No inicializado');
            }
        }
    
        // Eventos de los botones
        const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopBtn');
        const pauseButton = document.getElementById('pauseBtn');
        const resumeButton = document.getElementById('resumeBtn');
    
        if (startButton) {
            startButton.addEventListener('click', () => {
                startRecording();
                startButton.disabled = true;
                if (stopButton) stopButton.disabled = false;
            });
        }
    
        if (stopButton) {
            stopButton.addEventListener('click', () => {
                stopRecording();
                if (startButton) startButton.disabled = false;
                stopButton.disabled = true;
            });
        }
    
        if (pauseButton) {
            pauseButton.addEventListener('click', () => {
                pauseRecording();
                pauseButton.disabled = true;
                if (resumeButton) resumeButton.disabled = false;
            });
        }
    
        if (resumeButton) {
            resumeButton.addEventListener('click', () => {
                resumeRecording();
                resumeButton.disabled = true;
                if (pauseButton) pauseButton.disabled = false;
            });
        }
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        console.log('Inicializando grabadora de audio...');
        initializeAudioRecorder();  // Inicializa el grabador de audio
    });
