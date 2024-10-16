    document.getElementById('startButton').addEventListener('click', function() {
        const popupWindow = window.open('', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
        fetch('Pages/Controller/controller.html')
        .then(response => response.text())
        .then(html => {
            popupWindow.document.write(html);

            const audioScript = popupWindow.document.createElement('script');
            audioScript.src = 'Assets/audiorecorder.js';
            popupWindow.document.body.appendChild(audioScript);
    
            const controllerScript = popupWindow.document.createElement('script');
            controllerScript.src = 'Pages/Controller/controller.js';
            popupWindow.document.body.appendChild(controllerScript);
            
        }).catch(err => console.error('Error loading page: ', err));
    });

    document.getElementById('quickGuideButton').addEventListener('click', function() {
        navigateTo('/guide');
    })
