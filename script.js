let timer;
let elapsedTime = 0; 
let isRunning = false;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapsList = document.getElementById("laps-list");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return {
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        milliseconds: String(milliseconds).padStart(2, "0"),
    };
}

function updateDisplay() {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds;
    millisecondsDisplay.textContent = milliseconds;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;

        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = ""; // Clear 
}

function recordLap() {
    if (isRunning) {
        const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
        const lapTime = `${minutes}:${seconds}:${milliseconds}`;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

updateDisplay();