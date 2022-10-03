import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const flatpickrOptions = {
  locale: Ukrainian,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'd.m.Y H:i:S',
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
  },
};

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const flatpickredInputData = flatpickr(inputRef, flatpickrOptions);
let selectedDate;

inputRef.addEventListener('input', getSelectedDate);

function getSelectedDate() {
  selectedDate = flatpickredInputData.selectedDates[0].getTime();
  const currentDate = Date.now();
  if (selectedDate <= currentDate) {
    Notify.failure('Please choose a date in the future', {
      position: 'right-top',
      timeout: 6000,
    });
    startBtnRef.setAttribute('disabled', 'true');
    return;
  } else {
    startBtnRef.removeAttribute('disabled');
  }
}

startBtnRef.addEventListener('click', onStartBtn);

function onStartBtn() {
  startBtnRef.removeEventListener('click', onStartBtn);
  const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const timeDelta = selectedDate - currentDate;
    const timeDeltaConverted = convertMs(timeDelta);
    const { days, hours, minutes, seconds } = timeDeltaConverted;

    if (timeDelta < 1000) {
      clearInterval(intervalId);
    }

    onChangeTimer(timeDeltaConverted);
  }, 1000);
}

function onChangeTimer(value) {
  days.textContent = value.days;
  hours.textContent = value.hours;
  minutes.textContent = value.minutes;
  seconds.textContent = value.seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
