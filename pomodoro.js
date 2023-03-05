const timerDisplay = document.querySelector('#time-left');
const pomodoroButton = document.querySelector('input[value="pomodoro"]');
const shortBreakButton = document.querySelector('input[value="short-break"]');
const longBreakButton = document.querySelector('input[value="long-break"]');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const alarmSelect = document.querySelector('#alarm-options')
const alarm = new Audio();

let countdown;
let seconds = 25 * 60; // 25 minutes
let timerType = 'pomodoro';
let pomodoroCount = 0;

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  // document.title = display;
}

function startTimer() {
  clearInterval(countdown);
  if (timerType === 'pomodoro') {
    seconds = 25 * 60;
    pomodoroCount++;
    if (pomodoroCount % 4 === 0) {
      seconds = 15 * 60; // long break every 4th pomodoro
    }
  } else if (timerType === 'short-break') {
    seconds = 5 * 60;
  } else if (timerType === 'long-break') {
    seconds = 15 * 60;
  }
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    seconds--;
    displayTimeLeft(seconds);
    if (seconds === 0) {
      clearInterval(countdown);
      playAlarm();
      return;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
}

function resetTimer() {
  clearInterval(countdown);
  if (timerType === 'pomodoro') {
    seconds = 25 * 60;
  }
  else if (timerType === 'short-break') {
    seconds = 5 * 60;
  }
  else if (timerType === 'long-break') {
    seconds = 15 * 60;
  }
  displayTimeLeft(seconds);
}

function handleTimerTypeChange() {
  timerType = this.value;
  resetTimer();
}

pomodoroButton.addEventListener('change', handleTimerTypeChange);
shortBreakButton.addEventListener('change', handleTimerTypeChange);
longBreakButton.addEventListener('change', handleTimerTypeChange);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// changing the alarms

function playAlarm() {
  const alarmfile = alarmSelect.value;
  if (alarmfile) {
    alarm.src = alarmFile;
    alarm.play();
  }
}


function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  var hr = document.createElement("hr");
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myUL").appendChild(hr);

  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  var list = document.getElementById('myUL')
  console.log(list)
  list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
  const closeFunction = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < closeFunction.length; i++) {
    closeFunction[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// changing the theme of the website

function themes() {
  const themeSelector = document.querySelector("#theme-options")
  const selectedImg = themeSelector.value;
  document.body.style.backgroundImage = `url(${selectedImg})`;
  themeSelector.addEventListener('change', themes);
}

const themeSelector = document.querySelector("#theme-options")
selector.addEventListener('change', themes);



// select Background sounds

const tracks = document.querySelectorAll("audio");

tracks.forEach((track) => {
  const playBtn = track.parentElement.querySelector(".play");
  const pauseBtn = track.parentElement.querySelector(".pause");
  const volumeSlider = track.parentElement.querySelector(".volume");

  playBtn.addEventListener("click", () => {
    if (track.paused) {
      track.play();
      playBtn.textContent = "";
    } else {
      track.pause();
      playBtn.textContent = "";
    }
  });

  pauseBtn.addEventListener("click", () => {
    track.pause();
    playBtn.textContent = "";
  });

  volumeSlider.addEventListener("input", () => {
    track.volume = volumeSlider.value;
  });
});
