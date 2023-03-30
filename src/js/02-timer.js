import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let countdownIntervalId;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      dateInput.value = '';
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

function updateTimer() {
  const timeDiff = Math.max(new Date(dateInput.value) - new Date(), 0);

  days.textContent = addLeadingZero(
    Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  );
  hours.textContent = addLeadingZero(
    Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
  );
  minutes.textContent = addLeadingZero(
    Math.floor((timeDiff / (1000 * 60)) % 60)
  );
  seconds.textContent = addLeadingZero(Math.floor((timeDiff / 1000) % 60));

  if (timeDiff === 0) {
    clearInterval(countdownIntervalId);
    startButton.disabled = true;
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  countdownIntervalId = setInterval(updateTimer, 1000);
});
