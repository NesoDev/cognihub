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
        window.close();
    }
};
window.AudioController = AudioController;
