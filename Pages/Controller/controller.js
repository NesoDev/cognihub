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


const AudioController = {
    isPaused: false,
    togglePause: function() {
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'block';
        document.getElementById('stopBtn').disabled = false;
        this.isPaused = true;
    },
    toggleResume: function() {
        document.getElementById('pauseBtn').style.display = 'block';
        document.getElementById('resumeBtn').style.display = 'none';
        this.isPaused = false;
    },
    toggleStop: function() {
        document.getElementById('resumeBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'none';
        document.getElementById('testBtn').style.display = 'block';
    },
    toggleTest: function() {
        window.opener.dispatchEvent(new CustomEvent('startTest'));
        window.close();
    }
};
window.AudioController = AudioController;
