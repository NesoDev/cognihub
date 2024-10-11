let isPaused = false;

function togglePause() {
    document.getElementById('pauseBtn').style.display = 'none'; // Oculta el botón "Pausar"
    document.getElementById('resumeBtn').style.display = 'block'; // Muestra el botón "Reanudar"
    document.getElementById('stopBtn').disabled = false;
    isPaused = true;
}

function toggleResume() {
    document.getElementById('pauseBtn').style.display = 'block'; // Muestra el botón "Pausar"
    document.getElementById('resumeBtn').style.display = 'none'; // Oculta el botón "Reanudar"
    isPaused = false;
}

function toggleStop() {
    window.close();
    // avisar a la página principal que le proceso terminó
}
