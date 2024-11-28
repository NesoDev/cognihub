document.getElementById('startReading').addEventListener('click', function() {
    location.reload();
});

// for the random background
const backgroundContainer = document.getElementById('container__background');
const amountStart = 20;

for (let i = 0; i < amountStart; i++) {
    const imgElement = document.createElement('img');
    imgElement.src = '../../Assets/start-background.svg';
    imgElement.classList.add('decor');

    // generate random position
    const randomTop = Math.random() * 100;
    const randomLeft = Math.random() * 100;

    // generate random size
    const size = Math.random() * 50 + 20;

    // apply this random generated
    imgElement.style.top = `${randomTop}%`;
    imgElement.style.left = `${randomLeft}%`;
    imgElement.style.width = `${size}px`;
    imgElement.style.height = `${size}px`;

    // add the img to background container
    backgroundContainer.appendChild(imgElement);
}

