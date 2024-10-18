document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const stopButton = document.getElementById('stopButton');
    const remainingQuestionsBtn = document.getElementById('remainingQuestionsBtn');
    let remainingQuestions = 9;
    let stopRequest = false;

    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            sendMessageToAPI(userMessage);
            userInput.value = '';
            decrementQuestions();
        }
    });

    stopButton.addEventListener('click', () => {
        stopRequest = true;
    });

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
    }

    function sendMessageToAPI(message) {
        stopRequest = false;
        displayMessage('...', 'bot'); // Show a loading indicator

        // Simulate API request
        setTimeout(() => {
            if (stopRequest) {
                displayMessage('La solicitud fue detenida.', 'bot');
            } else {
                // Mock response
                const response = generateMockResponse(message);
                displayMessage(response, 'bot');
            }
        }, 1500); // Simulate delay
    }

    function generateMockResponse(userMessage) {
        // This is a mock function to simulate a response from the API
        return `Respuesta a: "${userMessage}"`;
    }

    function decrementQuestions() {
        remainingQuestions--;
        remainingQuestionsBtn.textContent = `Restan ${remainingQuestions} preguntas`;
        if (remainingQuestions <= 0) {
            remainingQuestionsBtn.disabled = true;
            remainingQuestionsBtn.textContent = 'No quedan preguntas';
        }
    }
});
