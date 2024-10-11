document.getElementById('startButton').addEventListener('click', function() {
    const popupWindow = window.open('', '', 'width=350,height=130,left=0,top=0,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no');
    fetch('Pages/Controller/controller.html')
    .then(response => response.text())
    .then(html => {
        popupWindow.document.write(html);
    }).catch(err => console.error('Error loading page: ', err));
}); 
