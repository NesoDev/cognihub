const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const stopButton = document.getElementById('stopButton');
const remainingQuestionsBtn = document.getElementById('remainingQuestionsBtn');

if (!chatBox || !userInput || !sendButton || !stopButton || !remainingQuestionsBtn) {
    console.log('No se encontraron los elementos necesarios en la test-page.'); 
} else {
    console.log('Se encontraron los elementos necesarios en la test-page.');
}

let remainingQuestions = 9;

sendInitialMessage();

sendButton.addEventListener('click', () => {
    sendUserMessage();
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
    }
});

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

    const iconElement = document.createElement('div');
    iconElement.innerHTML = sender === 'bot' 
        ? `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="30" height="30" fill="url(#pattern0_125_912)"/>
            <defs>
            <pattern id="pattern0_125_912" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_125_912" transform="scale(0.0104167)"/>
            </pattern>
            <image id="image0_125_912" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADx0lEQVR4nO2dS2sUQRSFS3fic+VaiY+FP8FH4gtR8C+4F3wsBRETcC8RA5quc3qGyS5uQhLBTXyASx8rTRDExEVU1KBEcSGmpLCFIAnJ6NhVt+p+cDbDzE36nO7qmu6608YoiqIoiqIoitIOvb29a9v6gNIZhoeH1wEYIPmp0nX/mvpbEyT7SbrFAnBVA6gvgLdLBPBOA6gvALeUNAANIA+oR8DfYa09CsCSnALwZTkj65b/XwBMkixIHjGpURTFLpIPQhvN1QdyvyzLnSYFABwgORfaVLavj2VZ7jcJ7PkSzXe/Q7DW7jBSIXk3AhPdvw5HRuoJN7R57FwIh400ACChAAaNNPxUM6EAJo00SM6HNo6d07yRRgSmuU7KSCO0YdQAwptGPQLaNwHACMnuVqu13sta20NyNFSdrIYgABeWqwfgYt11sgoAwMhKNQGM1VUnuwBIdq9UE8DBGuvkFcDAwMCGlWoC2FhXHQ1gCYaGhjbVVSe7AKy1PSvVLMvyUF11sguA5Ogqao7XWCe7AJyfIi5XD8CluutkFwB/mTfmZyl+LPeqhovxUHWyC4CRykgjtGHUAMKbRj0CwhtHHYLSkJFGSrckAXw20kjppjzJ50Ya1UJXl4huGGn4VcYRGOc6If8lzkgEwERo8/jvumekUhTFdpLvIzDRZbk41+OXePsNicBM144AfCC5z6SA34skrZQGMNFsNrtMavhVxn6hq5/WRfY9YR7AM5I3xZ5wFUVRFEVRlFg74pl6B720jnim1EEvuCPeie+gT6Aj3om+SCfpOg9T66BPqSOeEjvoU+qIp8QO+sRuvjtxHfSRXVZ22XXQR2CCC6kYzgELoU1gOP2IIQCxlxqYwoo5AK8yDuBlDAHcyTiA2zGchK+ENoLh1BfLRTiXo6y1e6N4iAKA16HNYP2ajuYBEiQvR2CIq1O+3dXEQqPR2FI9ycJlornBwcHNJiastWciMMbVpNMmNvx4mMN9AQAT0Yz9f9JqtbaSnAltEv+fpv02mpjxN61JzkZgluuwZqO9Ib9UY0a12tilIAAvxJi/eGb0N7/Nxvg0Gt2Mpx1IniL5VeBe/w3AeefcGiOdatnKuCDzx8QNOauB5HEAT0MbzOX1pCzLYyZ1fPNb9YNKCxGY7vXQWnsyieGmHRqNxjY/zgJ4HGCY8bO0PgC7Q/sQBUVR7CF5DsAtAG/+g+G+5jCAs/5vhd7e6Gk2m11lWZ7whgG4Vp3EH1XrkGaqtajfK81Vr01V7/Hv7fef9TWSbDlVFEVRFEVRFMVI5SdnWpx8ChD37gAAAABJRU5ErkJggg=="/>
            </defs>
            </svg>` // SVG del bot
        : null; // SVG del usuario

    const textElement = document.createElement('span');
    textElement.textContent = message;

    messageElement.appendChild(iconElement);
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);

    if (sender === 'bot') {
        typeMessage(textElement, message);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeMessage(element, message) {
    let index = 0;
    const typingSpeed = 5;

    function type() {
        if (index < message.length) {
            element.textContent += message.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    type();
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
