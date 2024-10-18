document.addEventListener('DOMContentLoaded', () => {
    console.log('Example page script loaded.');

    const button = document.getElementById('actionButton');
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
