const displayMinutes = document.querySelector('.timer-minutes');
const displaySeconds = document.querySelector('.timer-seconds');

let intervalId;
let startTime;
let timerDuration;

function startTimer() {
    if (intervalId) return;

    startTime = Date.now();
    intervalId = setInterval(() => {
        const elapsedMilliseconds = Date.now() - startTime;
        const remainingMilliseconds = timerDuration - elapsedMilliseconds;

        if (remainingMilliseconds <= 0) {
            stopTimer();
            return;
        }

        const remainingSeconds = Math.floor(remainingMilliseconds / 1000) % 60;
        const remainingMinutes = Math.floor(remainingMilliseconds / 1000 / 60);
        displayMinutes.textContent = remainingMinutes.toString().padStart(2, '0');
        displaySeconds.textContent = remainingSeconds.toString().padStart(2, '0');
    }, 10);
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function resetTimer() {
    stopTimer();
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    timerDuration = 0;
}

function setTimerDuration(minutes, seconds) {
    timerDuration = (minutes * 60 + seconds) * 1000;
    resetTimer();
}

document.querySelector('.start-btn').addEventListener('click', startTimer);
document.querySelector('.pause-btn').addEventListener('click', stopTimer);
document.querySelector('.reset-btn').addEventListener('click', resetTimer);

document.querySelector('#minutes-input').addEventListener('change', (event) => {
    const minutes = parseInt(event.target.value);
    const seconds = parseInt(document.querySelector('#seconds-input').value);
    setTimerDuration(minutes, seconds);
});

document.querySelector('#seconds-input').addEventListener('change', (event) => {
    const seconds = parseInt(event.target.value);
    const minutes = parseInt(document.querySelector('#minutes-input').value);
    setTimerDuration(minutes, seconds);
});