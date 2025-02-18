const BASE_URL = "https://ai-multi-tool-hub.onrender.com";  // Replace with your actual URL

// Calculator Function
function calculate() {
    let input = document.getElementById("calc-input").value;
    try {
        document.getElementById("calc-result").innerText = "Result: " + eval(input);
    } catch {
        document.getElementById("calc-result").innerText = "Invalid Expression!";
    }
}

// Chatbot Function
async function askChatbot() {
    let chatInput = document.getElementById("chat-input").value;
    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `<p><strong>You:</strong> ${chatInput}</p>`;

    let response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput })
    });

    let data = await response.json();
    chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.response}</p>`;
    document.getElementById("chat-input").value = "";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        askChatbot();
    }
}
