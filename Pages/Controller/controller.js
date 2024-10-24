document.addEventListener('DOMContentLoaded', function () {
    const openerWindow = window.opener; // Acceder a la ventana principal

    if (!openerWindow || !openerWindow.mediaRecorder) {
        console.error('No se pudo acceder al MediaRecorder de la ventana principal.');
        return;
    }

    // Sincroniza el estado de los botones al abrir la ventana
    const mediaRecorder = openerWindow.mediaRecorder;

    if (mediaRecorder.state === 'recording') {
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('resumeBtn').style.display = 'none';
        document.getElementById('stopBtn').disabled = false;
    } else if (mediaRecorder.state === 'paused') {
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('resumeBtn').style.display = 'inline-block';
        document.getElementById('stopBtn').disabled = false;
    } else if (mediaRecorder.state === 'inactive') {
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('resumeBtn').style.display = 'none';
        document.getElementById('stopBtn').disabled = true;
    }

    // Pausar la grabación desde la ventana principal
    document.getElementById('pauseBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state === 'recording') {
            openerWindow.mediaRecorder.pause();
            console.log('Grabación pausada desde ventana emergente');
            document.getElementById('pauseBtn').disabled = true;
            document.getElementById('resumeBtn').style.display = 'inline-block';
        }
    });

    // Reanudar la grabación desde la ventana principal
    document.getElementById('resumeBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state === 'paused') {
            openerWindow.mediaRecorder.resume();
            console.log('Grabación reanudada desde ventana emergente');
            document.getElementById('pauseBtn').disabled = false;
            document.getElementById('resumeBtn').style.display = 'none';
        }
    });

    // Detener la grabación desde la ventana principal
    document.getElementById('stopBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state !== 'inactive') {
            openerWindow.mediaRecorder.stop();
            console.log('Grabación detenida desde ventana emergente');
            document.getElementById('pauseBtn').disabled = true;
            document.getElementById('resumeBtn').style.display = 'none';
            document.getElementById('stopBtn').disabled = true;
        }
    });
});
