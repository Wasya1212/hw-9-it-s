function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function createInterval(fn, timeout = 1000) {
  let timer;
  const start = () => !timer && (timer = setInterval(fn, timeout));
  const end = () => timer && (timer = clearInterval(timer));
  return [start, end];
}

function disableBtn(btn) {
  btn.setAttribute('disabled', true);
}

function enableBtn(btn) {
  btn.removeAttribute('disabled');
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

const [startChangeBg, stopChangeBg] = createInterval(() => {
  document.body.style.backgroundColor = getRandomHexColor();
});

const onStart = () => {
  startChangeBg();
  disableBtn(startBtn);
  enableBtn(stopBtn);
};

const onStop = () => {
  stopChangeBg();
  disableBtn(stopBtn);
  enableBtn(startBtn);
};

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

disableBtn(stopBtn);