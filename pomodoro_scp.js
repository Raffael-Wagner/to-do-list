var minutos = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
const startButton = document.getElementsByClassName("startButton");
const breakButton = document.getElementsByClassName("breakButton");


minutos.innerHTML = '25';
seconds.innerHTML = '00';

let min = 25;
let sec = 60;
let intervalId;

function startPomodoro() {
    startButton[0].style.display = "none";
    breakButton[0].style.display = "inline-block";

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

    if (min == 0  && sec == 0) {
        sec ++
        clearInterval(startPomodoro);
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
