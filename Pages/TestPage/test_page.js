const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const stopButton = document.getElementById('stopButton');
const remainingQuestionsBtn = document.getElementById('remainingQuestionsBtn');

// Si no existen estos elementos, significa que no estamos en 'test-page' y salimos
if (!chatBox || !userInput || !sendButton || !stopButton || !remainingQuestionsBtn) {
    console.log('No se encontraron los elementos necesarios en la test-page.'); 
} else {
    console.log('Se encontraron los elementos necesarios en la test-page.');
}

let remainingQuestions = 9;
let stopRequest = false;

// Iniciar con la primera pregunta enviando un mensaje inicial
sendInitialMessage();

// Evento para el botón "Enviar"
sendButton.addEventListener('click', () => {
    sendUserMessage();
});

// Evento para la tecla "Enter" en el textarea
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Evitar salto de línea
        sendUserMessage();
    }
});

// Evento para el botón "Detener"
stopButton.addEventListener('click', () => {
    stopRequest = true;
});

function sendInitialMessage() {
    const initialMessage = "Hola, dame la primera pregunta";
    sendMessageToAPI(initialMessage);
}

function sendUserMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        sendMessageToAPI(userMessage);
        userInput.value = '';
        decrementQuestions();
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

async function sendMessageToAPI(message) {
    if (remainingQuestions > 0) {
        try {
            const response = await fetch('https://goldfish-app-kfo84.ondigitalocean.app/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            displayMessage(data.message, 'bot');
        } catch (error) {
            displayMessage(`Error al obtener respuesta: ${error.message}`, 'bot');
        }
    } else {
        displayMessage('No quedan preguntas. Gracias por participar.', 'bot');
    }
}

function decrementQuestions() {
    remainingQuestions--;
    remainingQuestionsBtn.textContent = `Restan ${remainingQuestions} preguntas`;
    if (remainingQuestions <= 0) {
        remainingQuestionsBtn.disabled = true;
        remainingQuestionsBtn.textContent = 'No quedan preguntas';
    }
}
