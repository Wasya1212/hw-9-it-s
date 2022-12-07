import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let selectedTime = null;

const dateInput = document.querySelector('input#datetime-picker');
const daysContainer = document.querySelector('span[data-days]');
const hoursContainer = document.querySelector('span[data-hours]');
const minutesContainer = document.querySelector('span[data-minutes]');
const secondsContainer = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button');
startBtn.setAttribute('disabled', true);

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (+Date.now() >= +new Date(selectedDates[0])) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', true);
    } else {
      startBtn.removeAttribute('disabled');
      selectedTime = selectedDates[0];
    }
  },
};

flatpickr(dateInput, flatpickrOptions);

let timer;

const stopTimer = () => {
  timer = clearInterval(timer);
};

const startTimer = () => {
  timer = setInterval(() => {
    const mmillisecodsLeft = +new Date(selectedTime) - +Date.now();
    if (mmillisecodsLeft <= 0) return stopTimer();

    const time = convertMs(mmillisecodsLeft);
    daysContainer.textContent = addLeadingZero(time.days);
    hoursContainer.textContent = addLeadingZero(time.hours);
    minutesContainer.textContent = addLeadingZero(time.minutes);
    secondsContainer.textContent = addLeadingZero(time.seconds);
  }, 1000);
};

const onStart = () => {
  startTimer();
};

startBtn.addEventListener('click', onStart);