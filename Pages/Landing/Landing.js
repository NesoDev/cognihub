document.getElementById('startButton').addEventListener('click', function() {
    const popupWindow = window.open('', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
    fetch('Pages/Controller/controller.html')
    .then(response => response.text())
    .then(html => {
        popupWindow.document.write(html);

        // Crear y añadir el script de audiorecorder.js
        const audioScript = popupWindow.document.createElement('script');
        audioScript.src = 'Assets/audiorecorder.js';
        audioScript.onload = function() {
            // Asegurarte de que la función esté disponible después de que el script se haya cargado
            if (typeof initializeAudioRecorder === 'function') {
                initializeAudioRecorder(); // Llamar a la función para iniciar la grabación
            } else {
                console.error('initializeAudioRecorder no está definida.');
            }
        };
        popupWindow.document.body.appendChild(audioScript);
    
        // Crear y añadir el script de controller.js
        const controllerScript = popupWindow.document.createElement('script');
        controllerScript.src = 'Pages/Controller/controller.js';
        popupWindow.document.body.appendChild(controllerScript);
        
    }).catch(err => console.error('Error loading page: ', err));
});

document.getElementById('quickGuideButton').addEventListener('click', function() {
    navigateTo('/guide');
});
