document.getElementById('startButton').addEventListener('click', function() {
    // Abrir ventana emergente con la página de controlador
    const popupWindow = window.open('Pages/Controller/controller.html', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');

    // Esperar a que la ventana emergente cargue completamente
    popupWindow.onload = () => {
        console.log('Ventana emergente cargada completamente');

        // Aquí llamamos a la función para inicializar la grabación después de que todo haya cargado
        if (popupWindow.initializeAudioRecorder) {
            popupWindow.initializeAudioRecorder();
            popupWindow.startRecording(); // Aquí comienza la grabación
        } else {
            console.error('initializeAudioRecorder no está definida en la ventana emergente.');
        }
    };
});

// Navegar a la página de prueba cuando se dispare el evento 'startTest'
window.addEventListener('startTest', () => {
    navigateTo('/test-page');
});
