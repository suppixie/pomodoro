// let intervalId;
// let timeLeft;

// let isRunning = false;
//  const startButton = document.getElementById("start");
//  const stopButton = document.getElementById("stop");
//  const resetButton = document.getElementById("reset");
//  const minutesDisplay = document.getElementById("minutes");
//  const secondsDisplay = document.getElementById("seconds");

//  function starttimer() {
//     if (isRunning) return;
  
//     isRunning = true;
//     timeLeft = parseInt(minutesDisplay.textContent) * 60;
  
//     intervalId = setInterval(() => {
//       timeLeft--;
//       const minutes = Math.floor(timeLeft / 60);
//       const seconds = timeLeft % 60;
  
//       minutesDisplay.textContent = minutes.toString().padStart(2, "0");
//       secondsDisplay.textContent = seconds.toString().padStart(2, "0");
  
//       if (timeLeft === 0) {
//         clearInterval(intervalId);
//         isRunning = false;
//         alert("Time's up!");
//       }
//     }, 1000);
//   }

//   function stoptimer() {
//     clearInterval(intervalId);
//     isRunning = false;
//   }
  
//   startButton.addEventListener("click", starttimer);
//   stopButton.addEventListener("click", stoptimer);
 

let workTitle = document.getElementById('work');
let sBreakTitle = document.getElementById('sbreak');
let lBreakTitle = document.getElementById('lbreak');


let workTime = 25;
let shortBreakTime = 5;
let longBreakTime = 10;

let seconds = "00"

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "flex";
    document.getElementById('stop').style.display = "flex";
    document.getElementById('reset').style.display = "flex";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let shortBreakMinutes = shortBreakTime - 1;
    let longBreakMinutes = longBreakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    workMinutes = shortBreakMinutes;
                    breakCount++

                    // change the tabs
                    workTitle.classList.remove('active');
                    sBreakTitle.classList.add('active');}
                if (breakCount % 4 === 0){
                    // start long break
                    workMinutes = longBreakMinutes;
                    breakCount++
                    // change the tabs
                    workTitle.classList.remove('active');
                    lBreakTitle.classList.add('active');
                }
                else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++

                    // change the tabs
                    
                    sBreakTitle.classList.remove('active');
                    lBreakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}
function stop() {
    clearInterval(timerFunction,1000);
}
// startButton.addEventListener("click", start());
// stopButton.addEventListener("click", stop);



// changing the theme of the website

function themes (){
    const themeSelector = document.querySelector("#theme-options")
    const selectedImg=  themeSelector.value;
    document.body.style.backgroundImage = `url(${selectedImg})`;
    themeSelector.addEventListener('change', themes);}

    const themeSelector = document.querySelector("#theme-options")
    selector.addEventListener('change', themes);
      
//     }
//     else if (option=="2"){
//         document.getElementById("bg").style.backgroundImage="url(./assets/street.jpg)";
//     }
//     else if (option=="3"){
//         document.getElementById("bg").style.backgroundImage="url(./assets/seaside.jpg)";
//     }
    
// }

function changeVideo() {
    const video = document.querySelector('#bg-video');
    const selector = document.querySelector('#theme-options');
    const selectedVideo = selector.value;
    const source = document.querySelector('#bg-video source');
    source.src = selectedVideo;
    video.load();
  }

  const selector = document.querySelector('#theme-options');
  selector.addEventListener('change', changeVideo);




// function playVideo(){
//     themebox =document.getElementById("theme-options")
//     option=themeBox.options[themeBox.selectedIndex].value;
//     var video = document.getElementById("video1");
//     video.play();
//     }
//     else if (option=="2"){
//         var video = document.getElementById("video2");
//         video.play();
//     }
//     else if (option=="3"){
//         var video = document.getElementById("video3");
//         video.play();
//     }
// }