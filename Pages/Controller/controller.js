let isPaused = false;

window.togglePause = function() {
    document.getElementById('pauseBtn').style.display = 'none'; // Oculta el botón "Pausar"
    document.getElementById('resumeBtn').style.display = 'block'; // Muestra el botón "Reanudar"
    document.getElementById('stopBtn').disabled = false;
    isPaused = true;
}

window.toggleResume = function () {
    document.getElementById('pauseBtn').style.display = 'block'; // Muestra el botón "Pausar"
    document.getElementById('resumeBtn').style.display = 'none'; // Oculta el botón "Reanudar"
    isPaused = false;
}

window.toggleStop = function() {
    window.close();
    // avisar a la página principal que le proceso terminó
}
