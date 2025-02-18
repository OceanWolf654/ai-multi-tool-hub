const BASE_URL = "https://ai-multi-tool-hub.onrender.com/";


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


// Weather Forecast Function
async function getWeather() {
    let city = prompt("Enter city name:");
    if (!city) return;

    let response = await fetch(`${BASE_URL}/weather?city=${city}`);
    let data = await response.json();

    alert(`Weather in ${city}: ${data.weather}, Temperature: ${data.temperature}°C`);
}

// TIMER FUNCTION (Countdown)
let timerInterval;
function startTimer() {
    let minutes = prompt("Enter minutes:");
    if (!minutes || isNaN(minutes)) return;

    let seconds = minutes * 60;
    let display = document.getElementById("timer-display");

    clearInterval(timerInterval); // Clear any existing timers
    timerInterval = setInterval(() => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        display.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
        seconds--;

        if (seconds < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        }
    }, 1000);
}

// STOPWATCH FUNCTION
let stopwatchInterval;
let stopwatchSeconds = 0;
function startStopwatch() {
    if (stopwatchInterval) return;
    let display = document.getElementById("stopwatch-display");

    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        let min = Math.floor(stopwatchSeconds / 60);
        let sec = stopwatchSeconds % 60;
        display.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    document.getElementById("stopwatch-display").innerText = "0:00";
}