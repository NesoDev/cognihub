document.getElementById('startButton').addEventListener('click', function() {
    const popupWindow = window.open('', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
    
    fetch('Pages/Controller/controller.html')
        .then(response => response.text())
        .then(html => {
            popupWindow.document.write(html);

            // Asegúrate de agregar los scripts después de que el HTML se ha escrito
            const audioScript = popupWindow.document.createElement('script');
            audioScript.src = 'Assets/audiorecorder.js';
            audioScript.onload = () => {
                console.log('audiorecorder.js cargado correctamente');
                // Aquí llamamos a la función para iniciar la grabación después de que se ha cargado el script
                if (popupWindow.startRecording) {
                    popupWindow.startRecording(); // Asegúrate de que esta función esté definida en audiorecorder.js
                }
            };
            popupWindow.document.body.appendChild(audioScript);

            const controllerScript = popupWindow.document.createElement('script');
            controllerScript.src = 'Pages/Controller/controller.js';
            controllerScript.onload = () => {
                console.log('controller.js cargado correctamente');
            };
            popupWindow.document.body.appendChild(controllerScript);
    
            popupWindow.onload = () => {
                console.log('Ventana emergente cargada completamente');
                // No necesitas iniciar la grabación aquí, ya que lo hacemos en el audioScript.onload
            };
        }).catch(err => console.error('Error loading page: ', err));
});