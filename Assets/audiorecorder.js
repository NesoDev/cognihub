function initializeAudioRecorder() {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                sendAudio(audioBlob);  // Aquí puedes enviar el audio al servidor o procesarlo
            };

            mediaRecorder.onpause = () => {
                console.log('Grabación pausada (evento onpause detectado)');
            };

            mediaRecorder.onresume = () => {
                console.log('Grabación reanudada (evento onresume detectado)');
            };
        })
        .catch(error => console.error('Error accessing microphone:', error));

    function startRecording() {
        audioChunks = [];
        mediaRecorder.start();
        console.log('Grabación iniciada');
    }

    function pauseRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            console.log('Llamada a mediaRecorder.pause() realizada');
        } else {
            console.log('Error: No se puede pausar la grabación. Estado del MediaRecorder:', mediaRecorder.state);
        }
    }

    function resumeRecording() {
        if (mediaRecorder && mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
            console.log('Llamada a mediaRecorder.resume() realizada');
        } else {
            console.log('Error: No se puede reanudar la grabación. Estado del MediaRecorder:', mediaRecorder.state);
        }
    }

    function stopRecording() {
        if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            console.log('Grabación detenida');
        }
    }

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
    initializeAudioRecorder();  // Inicializa el grabador de audio
});