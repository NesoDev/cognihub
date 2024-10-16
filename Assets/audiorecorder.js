document.addEventListener('DOMContentLoaded', () => {
    
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
                // Aquí puedes enviar el audio al servidor o procesarlo
                sendAudio(audioBlob);
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

    // Función para pausar la grabación
    function pauseRecording() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
            console.log('Llamada a mediaRecorder.pause() realizada');
        } else {
            console.log('Error: No se puede pausar la grabación. Estado del MediaRecorder:', mediaRecorder.state);
        }
    }

    // Función para reanudar la grabación
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

    /*function sendAudio(audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        fetch('/upload', { 
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log('Audio enviado exitosamente:', data))
        .catch(error => console.error('Error al enviar audio:', error));
    } */

    document.getElementById('startButton').addEventListener('click', () => {
        startRecording();
        document.getElementById('startButton').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    });


    document.getElementById('stopBtn').addEventListener('click', () => {
        stopRecording();
        document.getElementById('startButton').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    });

    document.getElementById('pauseBtn').addEventListener('click', () => {
        pauseRecording();
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('resumeBtn').disabled = false;
    });

    document.getElementById('resumeBtn').addEventListener('click', () => {
        resumeRecording();
        document.getElementById('resumeBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
    });
});