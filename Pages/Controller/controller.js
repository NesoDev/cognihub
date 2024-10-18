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
