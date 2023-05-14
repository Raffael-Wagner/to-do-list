/* Variáveis dos elementos HTML referentes a minutos e segundos */
var minutos = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

/* Variáveis de elementos HTML para mudança de estilo via JavaScript */
const startButton = document.getElementsByClassName("startButton");
const breakButton = document.getElementsByClassName("breakButton");
const timerBox = document.getElementsByClassName("timer-box");
const topButtons = document.getElementsByClassName("top-button");

minutos.innerHTML = '25';
seconds.innerHTML = '00';

let min = 25;
let sec = 60;
var secondsCount = 1;
var pomodoroCount = 1;
let intervalId;


function startPomodoro() {
    startButton[0].style.display = "none";
    breakButton[0].style.display = "inline-block";
    
    if (min == 0 && sec == 0) {
        min = 25;
        sec = 60;
    }
    if (min == 25) {
        min --;
    }

    if (sec >= 0) {
        sec --;
    }
    if (sec < 0 && min != 0) {
        min --;
        sec = 59;
    }

    if (min < 10) {
        minutos.innerHTML = '0' + min;
    } else {
        minutos.innerHTML = min;
    }

    if (sec < 10) {
        seconds.innerHTML = '0' + sec;
    } else {
        seconds.innerHTML = sec;
    }

    if (secondsCount < 1500) {
        secondsCount ++;
        console.log(secondsCount)
        if ((min == 0 && sec == 0) && (secondsCount == 301 || secondsCount == 901)) {
            pomodoroButton();
            secondsCount = 0;
        }
    } else if (secondsCount == 1500 && pomodoroCount < 4) {
        secondsCount = 1;
        pomodoroCount ++;
        shortBreak();
    } else {
        secondsCount = 1;
        pomodoroCount = 1;
        longBreak();
    }

    if (min == 0  && sec == 0) {

        breakPomodoro()
        min = 25;
        sec = 60;
    }
}

function pomodoroButton() {
    minutos.innerHTML = "25";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(238, 38, 38, 0.7)";
    topButtons[0].style.background = "rgba(170, 28, 28, 0.7)";
    topButtons[1].style.background = "rgba(170, 28, 28, 0.7)";
    topButtons[2].style.background = "rgba(170, 28, 28, 0.7)";

    min = 25;
    sec = 60;

    breakPomodoro()
    
    if (min == 25) {
        min --;
    }
}

function shortBreak() {
    minutos.innerHTML = "05";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(26, 176, 63, 0.7)";
    topButtons[0].style.background = "rgba(21, 133, 58, 0.7)";
    topButtons[1].style.background = "rgba(21, 133, 58, 0.7)";
    topButtons[2].style.background = "rgba(21, 133, 58, 0.7)";

    min = 5;
    sec = 60;

    breakPomodoro()

    if (min == 5) {
        min --;
    }
}


function longBreak() {
    minutos.innerHTML = "15";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(26, 174, 176, 0.7)";
    topButtons[0].style.background = "rgba(21, 78, 133, 0.7)";
    topButtons[1].style.background = "rgba(21, 78, 133, 0.7)";
    topButtons[2].style.background = "rgba(21, 78, 133, 0.7)";

    min = 15;
    sec = 60;

    breakPomodoro()
    
    if (min == 15) {
        min --;
    }
}

function defInterval() {
    intervalId = setInterval(startPomodoro, 1000)
}


function breakPomodoro() {
    setTimeout(() => {
        clearInterval(intervalId);
    }, 0);

    startButton[0].style.display = "inline-block";
    breakButton[0].style.display = "none";
}
