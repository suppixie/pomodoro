const timerDisplay = document.querySelector('#time-left');
const pomodoroButton = document.querySelector('input[value="pomodoro"]');
const shortBreakButton = document.querySelector('input[value="short-break"]');
const longBreakButton = document.querySelector('input[value="long-break"]');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const alarm = document.querySelector('#alarm');

let countdown;
let seconds = 25 * 60; // 25 minutes
let timerType = 'pomodoro';
let pomodoroCount = 0;

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
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
      alarm.play();
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

// changing the theme of the website

function themes (){
    const themeSelector = document.querySelector("#theme-options")
    const selectedImg=  themeSelector.value;
    document.body.style.backgroundImage = `url(${selectedImg})`;
    themeSelector.addEventListener('change', themes);
}

    const themeSelector = document.querySelector("#theme-options")
    selector.addEventListener('change', themes);


// function changeVideo() {
//     const video = document.querySelector('#bg-video');
//     const selector = document.querySelector('#theme-options');
//     const selectedVideo = selector.value;
//     const source = document.querySelector('#bg-video source');
//     source.src = selectedVideo;
//     video.load();
//   }

//   const selector = document.querySelector('#theme-options');
//   selector.addEventListener('change', changeVideo);




// function alarms (){
//     const sounds = document.querySelector('#sound');
//     const alarmSelector = document.querySelector("#alarm-options");
//     const selectedSound=  alarmSelector.value;
//     sounds.load(selectedSound)
//     alarmSelector.addEventListener('change', alarms);
// }

//     const alarmSelector = document.querySelector("#alarm-options")
//     selector.addEventListener('change', themes);
