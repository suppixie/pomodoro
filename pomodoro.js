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

//to drag the pomodoro block

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}




// changing the alarms

function playAlarm() {
  const alarmFile = alarmSelect.value;
  if (alarmFile) {
    alarm.src = alarmFile;
    alarm.play();
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

var ppButton = document.getElementById("ppBtn");
ppButton.addEventListener("click", playPause);
tracks = document.getElementById("track");
function playPause() { 
    if (tracks.paused) {
        tracks.play();
        ppButton.innerHTML = "Pause";
        }
    else  {
        tracks.pause(); 
        ppButton.innerHTML = "Play";
        }
} 
function thisVolume(volume_value)
    {
        var tracks = document.getElementById("track");
        document.getElementById("vol").innerHTML=volume_value;
        tracks.volume = volume_value / 100;
        
    }




//add a task in the task list

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



// const audio = document.getElementsByClassName("track")
// const playBtn = document.getElementById("play")

// playBtn.addEventListener("click", function() {
//   audio.play();
// });

// function play() {
//   if (audio.paused){
//   audio.play();}
//   else {
//     audio.pause()
//   }
  
// }
