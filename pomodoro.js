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
let initial=true;
let pomoTime=25;
let sBreak=5;
let lBreak=15;

function setTime(){
  pomoTime= document.getElementById("workinput").value;
  sBreak = document.getElementById("sbreakinput").value;
  lBreak = document.getElementById("lbreakinput").value;
  resetTimer();
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
  // document.title = display;
}
function setTimer(){
  clearInterval(countdown);
  if (timerType === 'pomodoro') {
    seconds = pomoTime * 60;
    pomodoroCount++;
    if (pomodoroCount % 4 === 0) {
      seconds = lBreak * 60; // long break every 4th pomodoro
    }
  } else if (timerType === 'short-break') {
    seconds = sBreak * 60;
  } else if (timerType === 'long-break') {
    seconds = lBreak * 60;
  }
  startTimer(seconds)
}

function startTimer(seconds) {
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
function resumeTimer(){
  clearInterval(countdown);
  var currTime=timerDisplay.textContent.split(":");
  var sec=(Number(currTime[0])*60)+(Number(currTime[1]));
  startTimer(sec)
}

function toggleTimer(){
  pauseButton.style.display="block";
  startButton.style.display="none";
  if(initial){
    setTimer();
  }else resumeTimer();
}

function pauseTimer() {
  clearInterval(countdown);
  initial=false;
  pauseButton.style.display="none";
  startButton.style.display="block";
}


function resetTimer() {
  initial=true;
  clearInterval(countdown);
  if (timerType === 'pomodoro') {
    seconds = pomoTime * 60;
  }
  else if (timerType === 'short-break') {
    seconds = sBreak * 60;
  }
  else if (timerType === 'long-break') {
    seconds = lBreak * 60;
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
startButton.addEventListener('click', toggleTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

//to drag the pomodoro block

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(event) {
  var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));

}

function drop(event) {
  var offset = event.dataTransfer.getData("text/plain").split(',');
  var dm = document.getElementById('dragme');
  dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
  dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
  event.preventDefault();
  return false;

}
function drag_over(event) { 
  event.preventDefault(); 
  return false; 
} 

var dm = document.getElementById('dragme'); 
dm.addEventListener('dragstart',drag_start,false); 
document.body.addEventListener('dragover',drag_over,false); 
document.body.addEventListener('drop',drop,false); 

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

const ppBtn = document.getElementById("ppBtn").addEventListener("click",playPause());
const tracks = document.getElementById("track");
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

  function thisVolume(volume_value){
  var tracks = document.getElementById("track");
  document.getElementById("vol").innerHTML=volume_value;
  tracks.volume = volume_value / 100;}


//add a task in the task list

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);

  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  li.className="taskItem";
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  var list = document.getElementsByClassName("taskItem");
  for (i = 0; i < list.length; i++) {
    list[i].onclick=function (){this.classList.toggle('checked');}
  }
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
