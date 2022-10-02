function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const body = document.body;
let intervalId;

startBtnRef.addEventListener('click', onStartBtn);

function onStartBtn() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtnRef.setAttribute('disabled', 'true');
  }, 1000);
}

stopBtnRef.addEventListener('click', onStopBtn);

function onStopBtn() {
  clearInterval(intervalId);
  startBtnRef.removeAttribute('disabled');
}
