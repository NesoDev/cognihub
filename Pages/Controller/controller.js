document.addEventListener('DOMContentLoaded', function () {
    const openerWindow = window.opener; 

    if (!openerWindow || !openerWindow.mediaRecorder) {
        console.error('No se pudo acceder al MediaRecorder de la ventana principal.');
        return;
    }

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

    document.getElementById('pauseBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state === 'recording') {
            openerWindow.mediaRecorder.pause();
            console.log('Grabación pausada desde ventana emergente');
            document.getElementById('pauseBtn').style.display = 'none';
            document.getElementById('resumeBtn').style.display = 'block';
            document.getElementById('stopBtn').disabled = false;
            this.isPaused = true;
        }
    });

    document.getElementById('resumeBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state === 'paused') {
            openerWindow.mediaRecorder.resume();
            console.log('Grabación reanudada desde ventana emergente');
            document.getElementById('pauseBtn').style.display = 'block';
            document.getElementById('resumeBtn').style.display = 'none';
            this.isPaused = false;
        }
    });

    document.getElementById('stopBtn').addEventListener('click', function() {
        if (openerWindow.mediaRecorder && openerWindow.mediaRecorder.state !== 'inactive') {
            openerWindow.mediaRecorder.stop();
            console.log('Grabación detenida desde ventana emergente');
            document.getElementById('resumeBtn').style.display = 'none';
            document.getElementById('pauseBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'none';
            document.getElementById('testBtn').style.display = 'block';
        }
    });

    document.getElementById('testBtn').addEventListener('click', function() {
        window.opener.dispatchEvent(new CustomEvent('startTest'));
        window.close();
    });
});
