let timerId;
let millisElapsedBeforeLastStart = 0;
let lastTimerStartTime = 0;
const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", stopTimer);

resetButton.addEventListener("click", resetTimer);

function startTimer() {
  startButton.disabled = true;

  stopButton.disabled = false;

  resetButton.disabled = true;

  lastTimerStartTime = Date.now();

  timerId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  startButton.disabled = false;

  stopButton.disabled = true;

  resetButton.disabled = false;

  millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime;

  cancelAnimationFrame(timerId);
}

function resetTimer() {
  resetButton.disabled = true;
  timer.textContent = "00:00:000";

  millisElapsedBeforeLastStart = 0;
}

function updateTimer() {
  const millisecondsElapsed =
    Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart;
  const secondsElapsed = millisecondsElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  const millisecondsText = formatNumber(millisecondsElapsed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondsElapsed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2);

  timer.textContent = `${minutesText}:${secondsText}:${millisecondsText}`;

  timerId = requestAnimationFrame(updateTimer);
}

function formatNumber(number, desiredLength) {
  const stringNumber = String(number);

  if (stringNumber.length >= desiredLength) {
    return stringNumber.slice(0, desiredLength);
  }

  return stringNumber.padStart(desiredLength, "0");
}
