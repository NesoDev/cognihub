document.getElementById('startButton').addEventListener('click', function() {
    // Abrir ventana emergente con la página de controlador
    const popupWindow = window.open('Pages/Controller/controller.html', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');

    // Esperar a que la ventana emergente cargue completamente
    popupWindow.onload = () => {
        console.log('Ventana emergente cargada completamente');
        
        // Inicializar el grabador de audio
        if (popupWindow.initializeAudioRecorder) {
            popupWindow.initializeAudioRecorder();

            // Esperar un breve momento para asegurarnos de que todo esté listo antes de iniciar la grabación
            setTimeout(() => {
                // Iniciar grabación en el controlador
                if (popupWindow.startRecording) {
                    popupWindow.startRecording();
                } else {
                    console.error('startRecording no está definida en el contexto de la ventana emergente.');
                }
            }, 100); // Esperar 100 ms antes de iniciar la grabación
        } else {
            console.error('initializeAudioRecorder no está definida en el contexto de la ventana emergente.');
        }
    };
});


// Navegar a la página de prueba cuando se dispare el evento 'startTest'
window.addEventListener('startTest', () => {
    navigateTo('/test-page');
});
